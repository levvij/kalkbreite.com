import { Component } from "@acryps/page";
import { ArtistSummaryModel, GraffitiSummaryModel, RailcarSummaryModel } from "../../managed/services";

export class GraffitiCollectionComponent extends Component {
	constructor(
		private graffitis: GraffitiSummaryModel[]
	) {
		super();
	}

	render() {
		return <ui-graffitis>
			{this.graffitis.map(graffiti => <ui-graffiti ui-href={`/graffiti/${graffiti.id}`}>
				{graffiti.captures[0] && <img src={`/capture/graffiti/${graffiti.id}`} loading='lazy' />}

				<ui-detail>
					{graffiti.artist && <ui-artist>
						{graffiti.artist.name}
					</ui-artist>}

					{graffiti.name && <ui-name>
						{graffiti.name}
					</ui-name>}
				</ui-detail>
			</ui-graffiti>)}
		</ui-graffitis>;
	}
}
