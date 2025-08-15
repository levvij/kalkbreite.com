import { Component } from "@acryps/page";
import { GraffitiInspirationSummaryModel, GraffitiService } from "../managed/services";
import { Application } from "..";

export class GraffitiInspirationsPage extends Component {
	inspirations: GraffitiInspirationSummaryModel[];

	async onload() {
		this.inspirations = await new GraffitiService().getInspirations();
	}

	render(child) {
		if (child) {
			return <ui-graffiti-inspirations>
				{child}
			</ui-graffiti-inspirations>;
		}

		return <ui-graffiti-inspirations>
			{Application.session.account && <ui-actions>
				<ui-action ui-click={() => {
					const input = document.createElement('input');
					input.type = 'file';

					input.onchange = async () => {
						const file = input.files[0];

						if (file) {
							const inspiration = await new GraffitiService().createInspiration(file, file.type);

							this.navigate(inspiration);
						}
					};

					input.click();
				}}>
					Upload
				</ui-action>
			</ui-actions>}
		</ui-graffiti-inspirations>
	}
}
