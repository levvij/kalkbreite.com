import { Component } from "@acryps/page";
import { ArtistSummaryModel, GraffitiInspirationViewModel, GraffitiService } from "../managed/services";

export class GraffitiInspirationPage extends Component {
	declare parameters: { id };

	inspiration: GraffitiInspirationViewModel;
	artists: ArtistSummaryModel[];

	async onload() {
		this.inspiration = await new GraffitiService().getInspiration(this.parameters.id);
		this.artists = await new GraffitiService().getArtists();
	}

	render() {
		return <ui-graffiti-inspiration>
			<ui-field>
				<label>
					Name
				</label>

				<input $ui-value={this.inspiration.name} ui-change={() => this.save()} />
			</ui-field>

			<ui-field>
				<label>
					Description
				</label>

				<textarea $ui-value={this.inspiration.description} ui-change={() => this.save()} rows={8} />
			</ui-field>

			<ui-field>
				<label>
					Origin
				</label>

				<input $ui-value={this.inspiration.origin} ui-change={() => this.save()} />
			</ui-field>

			<ui-field>
				<label>
					Captured
				</label>

				<input $ui-value={this.inspiration.captured} ui-change={() => this.save()} type='datetime-label' />
			</ui-field>

			<ui-field>
				<label>Artist</label>

				<select $ui-value={this.inspiration.artist}>
					<option ui-value={null}>
						Unknown Artist
					</option>

					{this.artists.map(artist => <option ui-value={artist}>
						{artist.name}
					</option>)}
				</select>
			</ui-field>
		</ui-graffiti-inspiration>
	}

	save() {
		new GraffitiService().saveInpiration(this.inspiration, this.inspiration.artist?.id);
	}
}
