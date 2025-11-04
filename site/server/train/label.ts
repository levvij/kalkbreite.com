import { ViewModel } from "vlserver";
import { TrainLabel } from "../managed/database";
import { TrainProductBrandSummaryModel } from "./product-brand";

export class TrainLabelViewModel extends ViewModel<TrainLabel> {
	id;
	trainIdentifier;

	label;
	description;

	productBrand: TrainProductBrandSummaryModel;
}
