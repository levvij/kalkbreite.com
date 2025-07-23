import { ViewModel } from "vlserver";
import { Artist } from "../managed/database";
import { GraffitiSummaryModel } from "./graffiti";

export class ArtistSummaryModel extends ViewModel<Artist> {
	id;
	tag;

	name;
	summary;
	logo;
}

export class ArtistViewModel extends ArtistSummaryModel {
	origin;
	description;

	graffitis: GraffitiSummaryModel[]
}
