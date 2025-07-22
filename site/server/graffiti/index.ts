import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { GraffitiViewModel } from "./graffiti";

export class GraffitiService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getGraffiti(id: string) {
		return new GraffitiViewModel(
			await this.database.graffiti.find(id)
		);
	}
}
