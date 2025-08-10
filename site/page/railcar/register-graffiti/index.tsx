import { Component } from "@acryps/page";
import { ArtistSummaryModel, GraffitiService, GraffitiTypeViewModel, RailcarDirection, RailcarService, RailcarViewModel } from "../../managed/services";
import { SlideshowComponent } from "../../shared/slideshow";
import { RailcarPage } from "..";

export class RegisterGraffitiPage extends Component {
	declare parent: RailcarPage;

	artist: ArtistSummaryModel;
	artists: ArtistSummaryModel[];

	name = '';
	description = '';

	painted = new Date();

	type: GraffitiTypeViewModel;
	types: GraffitiTypeViewModel[];

	side: RailcarDirection;
	sides: HTMLElement[];

	async onload() {
		this.artists = await new GraffitiService().getArtists();
		this.types = await new GraffitiService().getTypes();
	}

	render() {
		return <ui-register-graffiti>
			<ui-field>
				<label>Name</label>

				<input $ui-value={this.name} />
			</ui-field>

			<ui-field>
				<label>Painted</label>

				<input $ui-value={this.painted} type='datetime-local' />
			</ui-field>

			<ui-field>
				<label>Description</label>

				<textarea rows='8' $ui-value={this.description} />
			</ui-field>

			<ui-field>
				<label>Graffiti Type</label>

				<select $ui-value={this.type}>
					{this.types.map(type => <option ui-value={type}>
						{type.name}
					</option>)}
				</select>
			</ui-field>

			<ui-direction>
				{this.sides = [
					this.renderDirection(RailcarDirection.forward),
					this.renderDirection(RailcarDirection.reverse)
				]}
			</ui-direction>

			<ui-field>
				<label>Artist</label>

				<select $ui-value={this.artist}>
					<option ui-value={null}>
						Unknown Artist
					</option>

					{this.artists.map(artist => <option ui-value={artist}>
						{artist.name}
					</option>)}
				</select>
			</ui-field>

			<ui-actions>
				<ui-action ui-click={async () => {
					const id = await new GraffitiService().register(this.parent.railcar.id, this.name, this.description, this.type.id, this.painted, this.side, this.artist?.id ?? null);

					this.navigate(`/graffiti/${id}`);
				}}>
					Register
				</ui-action>
			</ui-actions>
		</ui-register-graffiti>
	}

	renderDirection(side: RailcarDirection) {
		const element = <ui-direction ui-click={() => {
			for (let side of this.sides) {
				side.removeAttribute('ui-active');
			}

			element.setAttribute('ui-active', '');
			this.side = side;
		}}>
			<img src={`/capture/railcar/${this.parent.railcar.id}/${side}`} />
		</ui-direction>

		return element;
	}
}
