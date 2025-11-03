import { Component } from "@acryps/page";
import { GraffitiPage } from "..";
import { GraffitiInspirationSummaryModel, GraffitiService } from "../../managed/services";

export class AssignGraffitiInspirationPage extends Component {
	declare parent: GraffitiPage;

	inspirations: GraffitiInspirationSummaryModel[];

	async onload() {
		this.inspirations = await new GraffitiService().getInspirations();
	}

	render() {
		return <ui-assign-inspiration>
			<ui-empty ui-click={() => this.assign(null)}>
				No Inspiration
			</ui-empty>

			{this.inspirations.map(inspiration => {
				const firstImage = inspiration.media.find(media => media.mimeType?.startsWith('image/'));

				if (!firstImage) {
					return;
				}

				return <ui-inspiration ui-click={async () => this.assign(inspiration.id)}>
					<img src={`/capture/graffiti/inspiration/${firstImage.id}`} />
				</ui-inspiration>
			})}
		</ui-assign-inspiration>;
	}

	async assign(id: string) {
		await new GraffitiService().assignInspiration(this.parent.graffiti.id, id);

		this.navigate('..');
	}
}
