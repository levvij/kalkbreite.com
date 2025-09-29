import { ViewModel } from "vlserver";
import { RailcarModel, RailcarModelDrawing } from "../managed/database";

export class RailcarModelSummaryModel extends ViewModel<RailcarModel> {
	id;
	tag;

	name;
	shortname;
}

export class RailcarModelViewModel extends RailcarModelSummaryModel {
	summary;
	uicIdentifier;

	lengthIncludingBuffers;
	lengthIncludingCouplers;

	drawings: RailcarModelSummaryModel[];
}

export class RailcarModelDrawingSummaryModel extends ViewModel<RailcarModelDrawing> {
	id;

	name;
	source;
}
