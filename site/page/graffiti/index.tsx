import { Component } from "@acryps/page";
import { ArtistSummaryModel, ArtistViewModel, GraffitiService, GraffitiSummaryModel } from "../managed/services";
import { goIcon } from "../.built/icons";

export class GraffitisPage extends Component {
	artists: ArtistSummaryModel[];
	graffitis: GraffitiSummaryModel[];

	async onload() {
		this.artists = await new GraffitiService().getFeaturedArtists();
		this.graffitis = await new GraffitiService().getGraffitis();
	}

	breadcrumb = 'Graffitis';
	render(child) {
		if (child) {
			return <ui-graffitis>
				{child}
			</ui-graffitis>
		}

		return <ui-graffitis>
			<ui-overview>
				<ui-hint>
					Explore the {this.graffitis.length} graffitis painted on the railcars by hand.
					This is my favourite past time activity when I am unable to work on the layout.
					Friends help me too some times, as painting cars makes for a great at-home evening activity.
				</ui-hint>

				<ui-section>
					<ui-title>
						Featured Artists
					</ui-title>

					<ui-hint>
						Some of my favourite artists
					</ui-hint>

					<ui-artists>
						{this.artists.map(artist => <ui-artist ui-href={`/artist/${artist.tag}`}>
							{artist.logo ? <img src={URL.createObjectURL(new Blob([artist.logo], { type: 'image/svg+xml' }))} /> : <ui-name>
								{artist.name}
							</ui-name>}
						</ui-artist>)}
					</ui-artists>

					<ui-more ui-href='/artist'>
						View All {goIcon()}
					</ui-more>
				</ui-section>

				<ui-section>
					<ui-title>
						Latest Paintings
					</ui-title>

					<ui-hint>
						A timeline of all painted graffitis.
						Beware that some graffitis were not photographed yet and will be listed with a small grey rectangle.
					</ui-hint>

					<ui-graffitis>
						{this.graffitis.map(graffiti => <ui-graffiti ui-href={graffiti.id}>
							<img src={`/capture/graffiti/${graffiti.id}`} loading='lazy' />

							<ui-detail>
								<ui-date>
									{graffiti.painted.toLocaleDateString()}
								</ui-date>

								{!!graffiti.name && <ui-name>
									{graffiti.name}
								</ui-name>}

								{!!graffiti.artist && <ui-artist>
									{graffiti.artist?.name}
								</ui-artist>}

								{goIcon()}
							</ui-detail>
						</ui-graffiti>)}
					</ui-graffitis>
				</ui-section>
			</ui-overview>
		</ui-graffitis>
	}
}
