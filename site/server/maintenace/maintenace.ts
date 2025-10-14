import { ViewModel } from "vlserver";
import { Maintenance } from "../managed/database";
import { RailcarSummaryModel } from "../railcar/railcar";

export class MaintenanceSummaryModel extends ViewModel<Maintenance> {
	id;
	opened;
	completed;

	title;
}

export class MaintenanceViewModel extends MaintenanceSummaryModel {
	issue;
	description;
	cost;

	railcar: RailcarSummaryModel;
}
