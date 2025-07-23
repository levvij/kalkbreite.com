import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { CompanySummaryModel } from "./company";

export class CompanyService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async get(tag: string) {
		return new CompanySummaryModel(await this.database.company.first(company => company.tag.valueOf() == tag));
	}
}
