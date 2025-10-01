import { Service } from "vlserver";
import { DbContext, UicIdentifierIndexLetter } from "../managed/database";
import { RailcarModelViewModel } from "../railcar/model";
import { RailcarSummaryModel } from "../railcar/railcar";
import { UicIdentifierClassViewModel, UicIdentifierIndexLetterViewModel } from "./uic-identifier";

export class RailcarModelService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getModel(tag: string) {
		return new RailcarModelViewModel(
			await this.database.railcarModel
				.first(model => model.tag.valueOf() == tag)
		)
	}

	async getRailcars(modelId: string) {
		return RailcarSummaryModel.from(
			this.database.railcar
				.where(railcar => railcar.modelId == modelId)
				.orderByAscending(railcar => railcar.tag)
		)
	}

	async getUicClasses() {
		return UicIdentifierClassViewModel.from(
			this.database.uicIdentifierClass
				.orderByAscending(identifier => identifier.code)
		);
	}

	async getUicIndexLetters(localeId: string) {
		return UicIdentifierIndexLetterViewModel.from(
			this.database.uicIdentifierIndexLetter
				.where(identifier => identifier.uicLocaleId == null || identifier.uicLocaleId == localeId)
				.orderByAscending(identifier => identifier.code)
		);
	}
}
