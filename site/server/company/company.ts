import { ViewModel } from "vlserver";
import { Company } from "../managed/database";

export class CompanySummaryModel extends ViewModel<Company> {
	id;
	tag;

	name;
	shortname;
}
