import { ViewModel } from "vlserver";
import { CollisionIncident, DecouplingIncident, DerailingIncident, PowerLossIncident } from "../managed/database";

export class DecouplingIncidentViewModel extends ViewModel<DecouplingIncident> {
	id;

	failed;

	section;
	position;
}
