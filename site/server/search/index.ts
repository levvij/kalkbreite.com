import { Service } from "vlserver";
import { SearchManager } from "./term";

export class SearchService extends Service {
	constructor(
		private searchManager: SearchManager
	) {
		super();
	}

	async search(query: string) {
		const result = await this.searchManager.search(query);

		if (result) {
			return result.term.link;
		}
	}
}
