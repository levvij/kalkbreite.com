import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { RailcarSummaryModel, RailcarViewModel } from "./railcar";
import { updateThumbnail } from "../capture/thumbnail";

export class RailcarService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	list() {
		return RailcarSummaryModel.from(this.database.railcar
			.orderByDescending(railcar => railcar.aquired)
		);
	}

	async get(tag: string) {
		return new RailcarViewModel(await this.database.railcar.first(railcar => railcar.tag.valueOf() == tag));
	}

	async setAnchor(captureId: string, offset: number) {
		const capture = await this.database.capture.find(captureId);
		capture.bufferAnchorOffset = offset;

		await updateThumbnail(capture);
	}
}
