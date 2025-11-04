import { ViewModel } from "vlserver";
import { LastTrainHeadPositionView, TrainHeadPosition } from "../managed/database";
import { ResponseModel } from "vlserver/dist/resolve";

export class TrainHeadPositionViewModel extends ViewModel<TrainHeadPosition> {
	id;
	trainIdentifier;

	section;
	offset;
	reversed;

	updated;
}

export class LastTrainPosition extends ResponseModel {
	trainIdentifier: string;

	section: string;
	offset: number;
	reversed: boolean;
	coupledLength: number;

	updated: Date;

	label: string;
	icon: string;
}

export class LastTrainHeadPositionViewModel extends ViewModel<LastTrainPosition> {
	trainIdentifier;

	section;
	offset;
	reversed;
	coupledLength: number;

	updated;

	label;
	icon;
}
