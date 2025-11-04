import { Service } from "vlserver";
import { Coupling, DbContext, Uncoupling } from "../managed/database";
import { TrainChain } from "./chain";
import { RailcarSummaryModel } from "../railcar/railcar";
import { TrainViewModel } from "./train";
import { TrainRailcarUnitViewModel, TrainUnitViewModel } from "./unit";
import { TrainProductBrandSummaryModel } from "./product-brand";
import { TrainLabelViewModel } from "./label";
import { TrainState, TrainStateViewModel } from "./state";
import { LastTrainHeadPositionViewModel, LastTrainPosition } from "./position";

export class TrainService extends Service {
	constructor(
		private database: DbContext,
		private chain: TrainChain
	) {
		super();
	}

	async uncoupleAfter(railcarId: string) {
		const train = this.chain.trains.find(train => train.units.find(unit => unit.railcar.id == railcarId));
		const unit = train.units.find(unit => unit.railcar.id == railcarId);

		if (!unit?.tail?.coupler) {
			return;
		}

		console.log(train.units.map(peer => `${peer.head.coupler.id}/${peer.railcar.tag}${peer == unit ? '#' : ''}/${peer.tail.coupler.id}`));

		const uncoupling = new Uncoupling();
		uncoupling.uncoupled = new Date();
		uncoupling.sourceId = unit.tail.coupler.id;

		await this.chain.uncouple(uncoupling.sourceId, uncoupling.uncoupled);
		await uncoupling.create();
	}

	async couple(
		sourceTrainIdentifier: string, sourceAnchor: string,
		targetTrainIdentifier: string, targetAnchor: string
	) {
		const source = this.chain.trains.find(train => train.identifier == sourceTrainIdentifier);
		const target = this.chain.trains.find(train => train.identifier == targetTrainIdentifier);

		const coupling = new Coupling();
		coupling.coupled = new Date();
		coupling.sourceId = sourceAnchor == 'head' ? source.headCoupler.id : source.tailCoupler.id;
		coupling.targetId = targetAnchor == 'head' ? target.headCoupler.id : target.tailCoupler.id;

		await this.chain.couple(coupling.sourceId, coupling.targetId, coupling.coupled);
		await coupling.create();
	}

	getTrains() {
		return TrainViewModel.from(
			[...this.chain.trains]
				.sort((a, b) => {
					if (+a.changed == +b.changed) {
						return a.identifier.localeCompare(b.identifier);
					}

					return a.changed > b.changed ? -1 : 1;
				})
		);
	}

	async getTrain(identifier: string) {
		const train = this.chain.trains.find(train => train.identifier == identifier);

		const state = new TrainState();

		state.label = await this.database.trainLabel
			.first(label => label.trainIdentifier.valueOf() == train.identifier);

		state.lastHeadPosition = await this.database.trainHeadPosition
			.orderByDescending(position => position.updated)
			.first(position => position.trainIdentifier.valueOf() == train.identifier)

		return new TrainStateViewModel(state);
	}

	getTrainRailcars(identifier: string) {
		const train = this.chain.trains.find(train => train.identifier == identifier);

		return TrainRailcarUnitViewModel.from(
			train.units.map(unit => unit.railcar)
		);
	}

	getUnitTrain(railcarId: string) {
		const train = this.chain.trains.find(train => train.units.find(unit => unit.railcar.id == railcarId));

		return train.identifier;
	}

	async getLastTrainPositions() {
		const positions: LastTrainPosition[] = [];

		for (let train of this.chain.trains) {
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
}
