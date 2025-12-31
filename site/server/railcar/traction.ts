import { ViewModel } from "vlserver";
import { Traction } from "../managed/database";

export class TractionViewModel extends ViewModel<Traction> {
	id;
	dccAddress;

	acceleration;
	deceleration;
	maximumSpeed;
}
