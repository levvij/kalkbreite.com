import { ViewModel } from "vlserver";
import { Train } from "./chain/train";

export class TrainViewModel extends ViewModel<Train> {
	identifier;
	created;
	changed;
	length;
}
