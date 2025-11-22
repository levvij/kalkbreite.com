import { ViewModel } from "vlserver";
import { CollisionIncident } from "../managed/database";

export class CollisionIncidentViewModel extends ViewModel<CollisionIncident> {
	id;

	failed;

	section;
	position;
}
