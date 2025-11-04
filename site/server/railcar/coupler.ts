import { ViewModel } from "vlserver";
import { Coupler, CouplerType } from "../managed/database";

export class CouplerViewModel extends ViewModel<Coupler> {
	id;

	type: CouplerTypeSummaryModel;
}

export class CouplerTypeSummaryModel extends ViewModel<CouplerType> {
	id;

	icon;
	flippable;
}

export class CouplerTypeViewModel extends CouplerTypeSummaryModel {
	name;
}
