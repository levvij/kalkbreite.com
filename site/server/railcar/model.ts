import { ViewModel } from "vlserver";
import { RailcarModel } from "../managed/database";

export class RailcarModelSummaryModel extends ViewModel<RailcarModel> {
	id;

	name;
	shortname;
}

export class RailcarModelViewModel extends RailcarModelSummaryModel {
	lengthIncludingBuffers;
	lengthIncludingCouplers;
}
