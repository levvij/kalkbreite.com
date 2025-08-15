import { ViewModel } from "vlserver";
import { Graffiti, GraffitiCapture, GraffitiType } from "../managed/database";
import { exit } from "process";
import { ArtistSummaryModel } from "./artist";
import { GraffitiRailcarViewModel, RailcarSummaryModel } from "../railcar/railcar";

export class GraffitiSummaryModel extends ViewModel<Graffiti> {
	id;

	name;
	painted;
	direction;

	artist: ArtistSummaryModel;
	captures: GraffitiCaptureViewModel[];
	type: GraffitiTypeViewModel;
}

export class GraffitiViewModel extends GraffitiSummaryModel {
	description;

	railcar: GraffitiRailcarViewModel;
}

export class GraffitiCaptureViewModel extends ViewModel<GraffitiCapture> {
	id;

	sourceId;

	top;
	left;
	width;
	height;
}

export class GraffitiTypeViewModel extends ViewModel<GraffitiType> {
	id;

	name;
}
