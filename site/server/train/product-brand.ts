import { ViewModel } from "vlserver";
import { TrainProductBrand } from "../managed/database";

export class TrainProductBrandSummaryModel extends ViewModel<TrainProductBrand> {
	id;

	name;
	shortName;

	icon;
}

export class TrainProductBrandViewModel extends TrainProductBrandSummaryModel {
	summary;
	description;

	iconNegative;
}
