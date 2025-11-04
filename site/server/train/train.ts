import { ViewModel } from "vlserver";
import { Train } from "./chain/train";
import { TrainLabelViewModel } from "./label";

export class TrainViewModel extends ViewModel<Train> {
	identifier;

	created;
	changed;
	railcarCount;
	coupledLength;

	headCouplerType;
	tailCouplerType;
}
