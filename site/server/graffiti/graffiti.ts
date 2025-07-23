import { ViewModel } from "vlserver";
import { Graffiti, GraffitiCapture, GraffitiType } from "../managed/database";
import { exit } from "process";
import { ArtistSummaryModel } from "./artist";
import { RailcarSummaryModel } from "../railcar/railcar";

export class GraffitiSummaryModel extends ViewModel<Graffiti> {
	id;

	name;
	painted;

	artist: ArtistSummaryModel;
	captures: GraffitiCaptureViewModel[];
	type: GraffitiTypeViewModel;
}

export class GraffitiViewModel extends GraffitiSummaryModel {
	description;
	direction;

	railcar: RailcarSummaryModel;
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
