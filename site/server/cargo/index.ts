import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { CargoLoadSummaryModel } from "./cargo";

export class CargoService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	getLoads() {
		return CargoLoadSummaryModel.from(
			this.database.cargoLoad
				.orderByAscending(load => load.id)
		);
	}
}
