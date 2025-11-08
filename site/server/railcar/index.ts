import { Service } from "vlserver";
import { Coupler, DbContext, Railcar } from "../managed/database";
import { RailcarSummaryModel, RailcarViewModel } from "./railcar";
import { updateThumbnail } from "../capture/thumbnail";
import { RailcarModelViewModel } from "./model";
import { CouplerTypeSummaryModel, CouplerTypeViewModel } from "./coupler";
import { CouplingViewModel } from "../train/coupling";

export class RailcarService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	list() {
		return RailcarSummaryModel.from(this.database.railcar
			.orderByDescending(railcar => railcar.aquired)
			.orderByAscending(railcar => railcar.tag)
		);
	}

	async get(tag: string) {
		return new RailcarViewModel(
			await this.database.railcar
				.first(railcar => railcar.tag.valueOf() == tag)
		);
	}

	async register(
		tag: string,
		name: string,
		runningNumber: string,
		aquired: Date,
		price: number,
		modelId: string,
		manufactuerId: string,
		ownerId: string,
		operatorId: string,

		headCouplerId: string,
		tailCouplerId: string
	) {
		const railcar = new Railcar();
		railcar.tag = tag;
		railcar.givenName = name;
		railcar.runningNumber = runningNumber;
		railcar.aquired = aquired;
		railcar.salePrice = price;
		railcar.modelId = modelId;
		railcar.manufacturerId = manufactuerId;
		railcar.ownerId = ownerId;
		railcar.operatorId = operatorId;

		if (headCouplerId) {
			const coupler = new Coupler();
			coupler.typeId = headCouplerId;

			await coupler.create();

			railcar.headCouplerId = coupler.id;
		}

		if (tailCouplerId) {
			const coupler = new Coupler();
			coupler.typeId = tailCouplerId;

			await coupler.create();

			railcar.tailCouplerId = coupler.id;
		}

		await railcar.create();
	}

	async getCouplerTypes() {
		return CouplerTypeViewModel.from(this.database.couplerType);
	}

	async setAnchor(captureId: string, offset: number) {
		const capture = await this.database.capture.find(captureId);
		capture.bufferAnchorOffset = offset;

		await updateThumbnail(capture);
	}

	async updateStorageState(railcarId: string, stored: boolean) {
		const railcar = await this.database.railcar.find(railcarId);
		railcar.stored = stored;

		await railcar.update();
	}
}
