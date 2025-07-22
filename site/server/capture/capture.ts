import { ViewModel } from "vlserver";
import { Capture } from "../managed/database";

export class CaptureViewModel extends ViewModel<Capture> {
	id;

	captured;
	direction;
}
