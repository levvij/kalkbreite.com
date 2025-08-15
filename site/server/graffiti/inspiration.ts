import { ViewModel } from "vlserver";
import { GraffitiInspiration, GraffitiInspirationMedia } from "../managed/database";
import { GraffitiSummaryModel } from "./graffiti";
import { ArtistSummaryModel } from "./artist";

export class GraffitiInspirationSummaryModel extends ViewModel<GraffitiInspiration> {
	id;

	name;
	origin;

	captured;
	paintingUrge;
}

export class GraffitiInspirationViewModel extends GraffitiInspirationSummaryModel {
	description;
	paintingEffort;

	artist: ArtistSummaryModel;
	media: GraffitiInspirationMediaViewModel[];
	paintings: GraffitiSummaryModel[];
}

export class GraffitiInspirationMediaViewModel extends ViewModel<GraffitiInspirationMedia> {
	id;
	mimeType;
}
