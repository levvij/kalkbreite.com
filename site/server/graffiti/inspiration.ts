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

	paintings: GraffitiSummaryModel[];
	media: GraffitiInspirationMediaViewModel[];
}

export class GraffitiInspirationViewModel extends GraffitiInspirationSummaryModel {
	description;
	paintingEffort;

	artist: ArtistSummaryModel;
}

export class GraffitiInspirationMediaViewModel extends ViewModel<GraffitiInspirationMedia> {
	id;
	mimeType;
}
