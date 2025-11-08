import { Service, ViewModel } from "vlserver";
import { Coupling, DbContext, Railcar, RailcarDirection, TrainLabel, Uncoupling } from "../managed/database";
import { RailcarSummaryModel } from "../railcar/railcar";
import { TrainResponse, TrainViewModel } from "./train";
import { TrainProductBrandSummaryModel } from "./product-brand";
import { TrainLabelViewModel } from "./label";
import { TrainState, TrainStateViewModel } from "./state";
import { LastTrainHeadPositionViewModel, LastTrainPosition } from "./position";
import { TrainRailcarUnitViewModel } from "./unit";
import { TrainChain } from "@packtrack/train";
import { Application } from "..";

export class TrainService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async uncoupleAfter(railcarId: string) {
		const train = Application.trainChain.trains.find(train => train.railcars.find(railcar => railcar.identifier == railcarId));
		const unit = train.railcars.find(unit => unit.identifier == railcarId);

		if (!unit?.tail?.coupler) {
			return;
		}

		const uncoupling = new Uncoupling();
		uncoupling.uncoupled = new Date();
		uncoupling.sourceId = unit.tail.coupler.identifier;

		await Application.trainChain.uncouple(unit.tail.coupler, uncoupling.uncoupled);
		await uncoupling.create();
	}

	async couple(
		sourceTrainIdentifier: string, sourceAnchor: string,
		targetTrainIdentifier: string, targetAnchor: string
	) {
		const source = Application.trainChain.trains.find(train => train.identifier == sourceTrainIdentifier);
		const target = Application.trainChain.trains.find(train => train.identifier == targetTrainIdentifier);

		const coupling = new Coupling();
		coupling.coupled = new Date();

		const sourceCoupler = sourceAnchor == 'head' ? source.headCoupler : source.tailCoupler;
		coupling.sourceId = sourceCoupler.identifier;

		const targetCoupler = targetAnchor == 'head' ? target.headCoupler : target.tailCoupler;
		coupling.targetId = targetCoupler.identifier;

		await Application.trainChain.couple(sourceCoupler, targetCoupler, coupling.coupled);
		await coupling.create();
	}

	async getTrains() {
		const trains: TrainResponse[] = [];

		for (let source of Application.trainChain.trains) {
			trains.push(await TrainResponse.from(source, this.database));
		}

		trains.sort((a, b) => {
			if (+a.changed == +b.changed) {
				return a.identifier.localeCompare(b.identifier);
			}

			return a.changed > b.changed ? -1 : 1;
		});

		return TrainViewModel.from(trains);
	}

	async getCoupleableTrains(identifier: string, end: string) {
		const train = Application.trainChain.trains.find(train => train.identifier == identifier);
		const couplerType = end == 'head' ? train.headCouplerType : train.tailCouplerType;

		const trains: TrainResponse[] = [];

		for (let source of Application.trainChain.trains) {
			if (source.headCouplerType == couplerType || source.tailCouplerType == couplerType) {
				trains.push(await TrainResponse.from(source, this.database));
			}
		}

		trains.sort((a, b) => {
			if (+a.changed == +b.changed) {
				return a.identifier.localeCompare(b.identifier);
			}

			return a.changed > b.changed ? -1 : 1;
		});

		return TrainViewModel.from(trains);
	}

	async getTrain(identifier: string) {
		const train = Application.trainChain.trains.find(train => train.identifier == identifier);

		return new TrainViewModel(await TrainResponse.from(train, this.database));
	}

	async getTrainRailcars(identifier: string) {
		const train = Application.trainChain.trains.find(train => train.identifier == identifier);
		const railcars: Railcar[] = [];

		for (let source of train.railcars) {
			const railcar = await this.database.railcar
				.includeTree(ViewModel.mappings[TrainRailcarUnitViewModel.name].items)
				.first(railcar => railcar.id == source.identifier);

			railcars.push(railcar);
		}

		return TrainRailcarUnitViewModel.from(railcars);
	}

	async getRailcarTrain(railcarId: string) {
		const train = Application.trainChain.trains.find(train => train.railcars.find(unit => unit.identifier == railcarId));

		if (!train) {
			return null;
		}

		return new TrainViewModel(await TrainResponse.from(train, this.database));
	}

	async getLastTrainPositions() {
		const positions: LastTrainPosition[] = [];

		for (let train of Application.trainChain.trains) {
			const update = await this.database.trainHeadPosition
				.orderByDescending(position => position.updated)
				.first(position => position.trainIdentifier.valueOf() == train.identifier);

			if (update) {
				const position = new LastTrainPosition();
				position.trainIdentifier = train.identifier;
				position.updated = update.updated;

				position.section = update.section;
				position.offset = update.offset;
				position.reversed = update.reversed;
				position.coupledLength = train.coupledLength;

				const label = await this.database.trainLabel
					.include(label => label.productBrand)
					.first(label => label.trainIdentifier.valueOf() == train.identifier);

				if (label) {
					position.label = label.label;

					const brand = await label.productBrand.fetch();

					if (brand) {
						position.icon = brand.icon;
					}
				}

				positions.push(position);
			}
		}

		return LastTrainHeadPositionViewModel.from(positions);
	}

	getProductBrands() {
		return TrainProductBrandSummaryModel.from(
			this.database.trainProductBrand
				.orderByAscending(brand => brand.name)
		)
	}

	getActiveLabels() {
		// TODO filter inactive trains
		return TrainLabelViewModel.from(
			this.database.trainLabel
		);
	}

	async getLabel(identifier: string) {
		const label = await this.database.trainLabel.first(label => label.trainIdentifier.valueOf() == identifier);

		if (!label) {
			return null;
		}

		return new TrainLabelViewModel(label);
	}

	async assignLabel(identifier: string, name: string, description: string, productBrandId: string, operatorId: string) {
		let label = await this.database.trainLabel.first(label => label.trainIdentifier.valueOf() == identifier);

		if (!label) {
			label = new TrainLabel();
			label.trainIdentifier = identifier;
		}

		label.label = name;
		label.description = description;
		label.productBrandId = productBrandId;
		label.operatorId = operatorId;

		if (label.id) {
			await label.update();
		} else {
			await label.create();
		}

		return new TrainLabelViewModel(label);
	}
}
