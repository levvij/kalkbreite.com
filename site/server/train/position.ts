import { ViewModel } from "vlserver";
import { TrainHeadPosition } from "../managed/database";

export class TrainHeadPositionViewModel extends ViewModel<TrainHeadPosition> {
	id;
	trainIdentifier;

	section;
	offset;
	reversed;

	updated;
}
