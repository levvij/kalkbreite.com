import { Service } from "vlserver";
import { Coupler, DbContext, Railcar, RailcarComission, RailcarWithdrawal } from "../managed/database";
import { RailcarSummaryModel, RailcarViewModel } from "./railcar";
import { updateThumbnail } from "../capture/thumbnail";
import { RailcarModelViewModel } from "./model";
import { CouplerTypeSummaryModel, CouplerTypeViewModel } from "./coupler";
import { CouplingViewModel } from "../train/coupling";
import { Application } from "..";
import { Section, SectionPosition } from "@packtrack/layout";

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
		railcar.givenName = name || null;
		railcar.runningNumber = runningNumber || null;
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

		await capture.update();
	}

	async withdraw(railcarId: string) {
		const railcar = Application.trainChain.railcars.find(railcar => railcar.identifier == railcarId);

		if (!railcar) {
			throw new Error(`Railcar not comissioned`);
		}

		const withdrawal = new RailcarWithdrawal();
		withdrawal.railcarId = railcar.identifier;
		withdrawal.withdrawn = new Date();

		await Application.trainChain.withdraw(railcar, withdrawal.withdrawn);
		await withdrawal.create();
	}

	async comission(railcarId: string, sectionName: string, offset: number, reversed: boolean) {
		if (Application.trainChain.railcars.find(railcar => railcar.identifier == railcarId)) {
			throw new Error(`Railcar already comissioned`);
		}

		const comission = new RailcarComission();
		comission.railcarId = railcarId;
		comission.comissioned = new Date();
		comission.section = sectionName;
		comission.offset = offset;
		comission.reversed = reversed;

		let section: Section;

		for (let district of Application.layout.allDistricts) {
			for (let peer of district.sections) {
				if (peer.domainName == sectionName) {
					section = peer;
				}
			}
		}

		if (!section) {
			throw new Error(`Section '${sectionName}' does not exist`);
		}

		const railcar = await Application.chainRestorer.importRailcar(
			await this.database.railcar.find(railcarId)
		);

		if (!railcar) {
			throw new Error(`Railcar '${railcarId}' does not exist`);
		}

		const position = new SectionPosition(section, offset, reversed);

		await Application.trainChain.comission(railcar, position, comission.comissioned);
		await comission.create();

		const train = Application.trainChain.trains.find(train => train.railcars.includes(railcar));

		return train.identifier;
	}
}
