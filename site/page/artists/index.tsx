import { Component } from "@acryps/page";
import { ArtistViewModel, GraffitiService, GraffitiSummaryModel } from "../managed/services";
import { goIcon } from "../.built/icons";
import { Application } from "..";

export class ArtistsPage extends Component {
	static shortcuts = ['artists'];

	artists: ArtistViewModel[];

	async onload() {
		this.artists = await new GraffitiService().getArtists();
	}

	render() {
		const featuredArtists = this.artists
			.filter(artist => artist.graffitis.length)
			.sort((a, b) => Math.max(...a.graffitis.map(graffiti => +graffiti.painted)) > Math.max(...b.graffitis.map(graffiti => +graffiti.painted)) ? -1 : 1);

		return <ui-artists>
			<ui-hint>
				Explore artists from the swiss and international graffiti scene.
				Some of them even came down to draw on the rolling stock themselves!
			</ui-hint>

			<ui-actions>
				<ui-action ui-href='/graffiti/inspiration'>
					View Inspirations
				</ui-action>
			</ui-actions>

			{featuredArtists.map(artist => <ui-artist>
				<ui-header ui-href={`/artist/${artist.tag}`}>
					{this.renderLogo(artist)}

					{goIcon()}
				</ui-header>

				<ui-summary>
					{artist.summary}
				</ui-summary>

				<ui-graffitis>
					{artist.graffitis.sort((a, b) => a.painted > b.painted ? -1 : 1).map(graffiti => <ui-graffiti ui-href={`/graffiti/${graffiti.id}`}>
						<img src={`/capture/graffiti/${graffiti.id}`} />
					</ui-graffiti>)}
				</ui-graffitis>
			</ui-artist>)}
		</ui-artists>
	}

	renderLogo(artist: ArtistViewModel) {
		if (!artist.logo) {
			return <ui-name>
				{artist.name}
			</ui-name>
		}

		return <ui-logo>
			<img
				loading='lazy'
				src={URL.createObjectURL(new Blob([artist.logo], { type: 'image/svg+xml' }))}
			/>

			<ui-name>
				{artist.name}
			</ui-name>
		</ui-logo>;
	}
}
