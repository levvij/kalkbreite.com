import { ViewModel } from "vlserver";
import { PowerLossIncident } from "../managed/database";

export class PowerLossIncidentViewModel extends ViewModel<PowerLossIncident> {
	id;

	failed;

	section;
	position;
}
