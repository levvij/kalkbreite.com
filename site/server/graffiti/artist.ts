import { ViewModel } from "vlserver";
import { Artist } from "../managed/database";

export class ArtistSummaryModel extends ViewModel<Artist> {
	id;

	name;
	logo;
}
