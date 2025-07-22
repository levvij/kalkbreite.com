import { Component } from "@acryps/page";
import { GraffitiService, GraffitiViewModel } from "../managed/services";
import { GraffitiPreviewComponent } from "../shared/graffiti-preview";

export class GraffitiPage extends Component {
	declare parameters: { id };

	graffiti: GraffitiViewModel;

	async onload() {
		this.graffiti = await new GraffitiService().getGraffiti(this.parameters.id);
	}

	render() {
		return <ui-graffiti>
			{new GraffitiPreviewComponent(this.graffiti.captures[0])}

			<ui-detail>
				{this.graffiti.name && <ui-name>
					{this.graffiti.name}
				</ui-name>}

				{this.graffiti.description && <ui-description>
					{this.graffiti.description}
				</ui-description>}

				<ui-artist ui-href={`/artist/${this.graffiti.artist.id}`}>
					<img src={URL.createObjectURL(new Blob([this.graffiti.artist.logo], { type: 'image/svg+xml' }))} />

					<ui-name>
						{this.graffiti.artist.name}
					</ui-name>
				</ui-artist>
			</ui-detail>
		</ui-graffiti>
	}
}
