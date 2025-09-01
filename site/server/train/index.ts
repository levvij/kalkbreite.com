import { Service } from "vlserver";
import { Coupling, DbContext } from "../managed/database";
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

		const coupling = new Coupling();
		coupling.coupled = new Date();
		coupling.sourceId = unit.tail.coupler.id;

		await coupling.create();

		this.chain.couple(coupling.sourceId, null, coupling.coupled);
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
