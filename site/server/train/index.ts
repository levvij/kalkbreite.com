import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { TrainChain } from "./chain";
import { RailcarSummaryModel } from "../railcar/railcar";

export class TrainService extends Service {
	constructor(
		private database: DbContext,
		private chain: TrainChain
	) {
		super();
	}

	getTrains() {
		return this.chain.trains.map(train => train.identifier);
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
