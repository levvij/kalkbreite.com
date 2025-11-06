import { ResponseModel } from "vlserver/dist/resolve";
import { Company, Railcar, TrainHeadPosition, TrainLabel } from "../managed/database";
import { ViewModel } from "vlserver";
import { TrainLabelViewModel } from "./label";
import { TrainHeadPositionViewModel } from "./position";
import { CompanySummaryModel } from "../company/company";

export class TrainState extends ResponseModel {
	label: TrainLabel;
	lastHeadPosition: TrainHeadPosition;
}

export class TrainStateViewModel extends ViewModel<TrainState> {
	label: TrainLabelViewModel;
	lastHeadPosition: TrainHeadPositionViewModel;
}
