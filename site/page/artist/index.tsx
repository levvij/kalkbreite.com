import { Component } from "@acryps/page";
import { ArtistViewModel, GraffitiService } from "../managed/services";
import { GraffitiCollectionComponent } from "../shared/graffiti-collection";

export class ArtistPage extends Component {
	declare parameters: { tag };

	artist: ArtistViewModel;

	async onload() {
		this.artist = await new GraffitiService().getArtist(this.parameters.tag);
	}

	render() {
		return <ui-artist>
			<ui-header>
				{this.artist.logo ? <img src={URL.createObjectURL(new Blob([this.artist.logo], { type: 'image/svg+xml' }))} /> : <ui-name>
					{this.artist.name}
				</ui-name>}

				{this.artist.origin && <ui-origin>
					{this.artist.origin}
				</ui-origin>}
			</ui-header>

			<ui-detail>
				<ui-description>
					{this.artist.description ?? '- REDACTED -'}
				</ui-description>

				{new GraffitiCollectionComponent(this.artist.graffitis)}
			</ui-detail>
		</ui-artist>
	}
}
