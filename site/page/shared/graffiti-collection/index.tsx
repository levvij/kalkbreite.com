import { Component } from "@acryps/page";
import { ArtistSummaryModel, GraffitiSummaryModel, RailcarSummaryModel } from "../../managed/services";
import { GraffitiPreviewComponent } from "../graffiti-preview";

export class GraffitiCollectionComponent extends Component {
	constructor(
		private graffitis: GraffitiSummaryModel[]
	) {
		super();
	}

	render() {
		return <ui-graffitis>
			{this.graffitis.map(graffiti => <ui-graffiti ui-href={`/graffiti/${graffiti.id}`}>
				{graffiti.captures[0] && new GraffitiPreviewComponent(graffiti.captures[0])}

				<ui-artist>
					{graffiti.artist.name}
				</ui-artist>

				{graffiti.name && <ui-name>
					{graffiti.name}
				</ui-name>}
			</ui-graffiti>)}
		</ui-graffitis>;
	}
}
