import { ViewModel } from "vlserver";
import { DerailingIncident } from "../managed/database";

export class DerailingIncidentViewModel extends ViewModel<DerailingIncident> {
	id;

	failed;

	section;
	position;
}
