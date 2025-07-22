import { Component } from "@acryps/page";
import { GraffitiCaptureViewModel, GraffitiSummaryModel } from "../../managed/services";

export class GraffitiPreviewComponent extends Component {
	skew = 0.375;
	scale = 1.2;

	constructor(
		private capture: GraffitiCaptureViewModel
	) {
		super();
	}

	render() {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		const image = new Image();

		image.onload = () => {
			const width = canvas.width = image.naturalWidth * this.capture.width * this.scale;
			const height = canvas.height = image.naturalHeight * this.capture.height;

			context.transform(1, 0, this.skew, 1, 0, 0);
			context.translate(-this.skew / 2 * height, 0);
			context.scale(this.scale, 1);

			context.drawImage(image, -image.naturalWidth * this.capture.left, -image.naturalHeight * this.capture.top);
		}

		image.src = `/capture/${this.capture.sourceId}`;

		return <ui-graffiti-preview>
			{canvas}
		</ui-graffiti-preview>
	}
}
