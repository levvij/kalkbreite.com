import { ViewModel } from "vlserver";
import { Coupler, Coupling } from "../managed/database";
import { CouplerViewModel } from "../railcar/coupler";

export class CouplingViewModel extends ViewModel<Coupling> {
	id;

	sourceId;
	coupled;

	targetId;
}
