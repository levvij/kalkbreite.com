import { ViewModel } from "vlserver";
import { Company } from "../managed/database";
import { RailcarSummaryModel } from "../railcar/railcar";

export class CompanySummaryModel extends ViewModel<Company> {
	id;
	tag;

	iconId;

	name;
	shortname;
}

export class CompanyViewModel extends CompanySummaryModel {
	description;

	parent: CompanySummaryModel;

	manufacturedRailcars: RailcarSummaryModel[];
	operatedRailcars: RailcarSummaryModel[];
	ownedRailcars: RailcarSummaryModel[];
}
