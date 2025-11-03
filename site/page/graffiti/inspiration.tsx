import { Component } from "@acryps/page";
import { GraffitiPage } from ".";
import { GraffitiViewModel } from "../managed/services";

export class InspirationComponent extends Component {
	constructor(
		private graffiti: GraffitiViewModel
	) {
		super();
	}

	render() {
		if (!this.graffiti.graffitiInspiration) {
			return document.createComment('');
		}

		const firstImage = this.graffiti.graffitiInspiration.media.find(media => media.mimeType?.startsWith('image/'));

		return <ui-inspiration ui-href={`/graffiti/inspiration/${this.graffiti.graffitiInspiration.id}`}>
			{firstImage && <img src={`/capture/graffiti/inspiration/${firstImage.id}`} />}

			Original graffiti in {this.graffiti.graffitiInspiration.origin || '- REDACTED -'}, captured at {this.graffiti.graffitiInspiration.captured?.toLocaleDateString() ?? '- REDACTED -'}
		</ui-inspiration>
	}
}
