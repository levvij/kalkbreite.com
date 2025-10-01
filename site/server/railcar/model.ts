import { ViewModel } from "vlserver";
import { RailcarModel, RailcarModelDrawing } from "../managed/database";
import { UicLocaleViewModel } from "../model/uic-identifier";

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

	uicLocale: UicLocaleViewModel;
	drawings: RailcarModelSummaryModel[];
}

export class RailcarModelDrawingSummaryModel extends ViewModel<RailcarModelDrawing> {
	id;

	name;
	source;
}
