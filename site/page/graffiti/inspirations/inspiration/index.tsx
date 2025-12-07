import { Component } from "@acryps/page";
import { ArtistSummaryModel, GraffitiInspirationViewModel, GraffitiService } from "../../../managed/services";
import { Application } from "../../..";
import { DetailSectionComponent } from "../../../shared/detail-section";
import { RailcarCollectionComponent } from "../../../shared/railcar-collection";
import { GraffitiCollectionComponent } from "../../../shared/graffiti-collection";
import { GraffitiInspirationsPage } from "..";

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
			{this.inspiration.media.map(media => {
				if (media.mimeType?.startsWith('image/')) {
					return <ui-media>
						<img src={`/capture/graffiti/inspiration/${media.id}`} />
					</ui-media>
				}

				return <ui-media>
					{media.mimeType}
				</ui-media>
			})}

			{Application.session.account ? <ui-detail>
				<ui-actions>
					<ui-action ui-click={() => GraffitiInspirationsPage.upload(false, this.inspiration).then(() => this.reload())}>
						Upload Media
					</ui-action>

					<ui-action ui-click={() => GraffitiInspirationsPage.upload(true, this.inspiration).then(() => this.reload())}>
						Capture Media
					</ui-action>
				</ui-actions>

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

					<input
						type='datetime-local'
						$ui-value={this.inspiration.captured}
						ui-change={() => this.save()}
					/>
				</ui-field>

				<ui-field>
					<label>
						Painting Urge
					</label>

					{this.renderSlider('paintingUrge')}
				</ui-field>

				<ui-field>
					<label>
						Painting Effort
					</label>

					{this.renderSlider('paintingEffort')}
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
			</ui-detail> : <ui-detail>
				<ui-title>
					{this.inspiration.name || this.inspiration.artist?.name || this.inspiration.captured?.toLocaleDateString()}
				</ui-title>

				<ui-description>
					{this.inspiration.description ?? '- REDACTED -'}
				</ui-description>

				{new DetailSectionComponent()
					.addMetric('Artist', () => this.inspiration.artist?.name)
					.addMetric('Captured', () => this.inspiration.captured?.toLocaleDateString())
					.addMetric('Origin', () => this.inspiration.origin ?? '- REDACTED -')}
			</ui-detail>}

			{new GraffitiCollectionComponent(this.inspiration.paintings)}
		</ui-graffiti-inspiration>
	}

	save() {
		this.inspiration.paintingEffort = +this.inspiration.paintingEffort;
		this.inspiration.paintingUrge = +this.inspiration.paintingUrge;

		new GraffitiService().saveInpiration(this.inspiration, this.inspiration.artist?.id ?? null);
	}

	renderSlider(field: keyof GraffitiInspirationViewModel) {
		const slider: HTMLInputElement = <input
			type='range'
			min='0'
			max='1'
			step='0.01'
		/>;

		slider.valueAsNumber = (this.inspiration[field] as number) ?? 0.5;

		slider.onchange = () => {
			(this.inspiration as any)[field] = slider.valueAsNumber;

			this.save();
		};

		return slider;
	}
}
