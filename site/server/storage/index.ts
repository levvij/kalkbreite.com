import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { StorageContainerViewModel } from "./storage-contaiuner";

export class StorageService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getContainer(tag: string) {
		return new StorageContainerViewModel(
			await this.database.storageContainer.first(container => container.tag.valueOf() == tag)
		);
	}
}
