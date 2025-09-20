import { Service } from "vlserver";
import { Coupling, DbContext, Uncoupling } from "../managed/database";
import { TrainChain } from "./chain";
import { RailcarSummaryModel } from "../railcar/railcar";
import { TrainViewModel } from "./train";

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
					if (a.units.length == b.units.length) {
						if (+a.changed == +b.changed) {
							return a.identifier.localeCompare(b.identifier);
						}

						return a.changed > b.changed ? -1 : 1;
					}

					return b.units.length - a.units.length;
				})
		);
	}

	getTrain(identifier: string) {
		const train = this.chain.trains.find(train => train.identifier == identifier);

		return RailcarSummaryModel.from(train.units.map(unit => unit.railcar));
	}

	getUnitTrain(railcarId: string) {
		const train = this.chain.trains.find(train => train.units.find(unit => unit.railcar.id == railcarId));

		return train.identifier;
	}
}
