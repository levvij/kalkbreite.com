import { Component } from "@acryps/page";
import { RailcarPage } from "..";
import { CaptureViewModel, RailcarService } from "../../../managed/services";
import { CropComponent } from "../../../shared/crop";

export class CaptureAnchorPage extends Component {
	declare parent: RailcarPage;
	declare parameters: { captureId };

	inset = {
		left: 0
	};

	cropper: CropComponent<{ left: number }>;

	referenceImage: HTMLImageElement;

	async onload() {
		const capture = this.parent.railcar.captures
			.find(capture => capture.id == this.parameters.captureId);

		const lastAnchoredCapture = this.parent.railcar.captures
			.toSorted((a, b) => a.captured > b.captured ? 1 : -1)
			.find(peer => peer != capture && peer.direction == capture.direction && peer.bufferAnchorOffset);

		if (lastAnchoredCapture) {
			this.referenceImage = await new Promise<HTMLImageElement>(done => {
				const image = new Image();

				image.onload = () => {
					const canvas = document.createElement('canvas');
					canvas.height = image.naturalHeight;
					canvas.width = Math.floor(image.naturalWidth * (1 - lastAnchoredCapture.bufferAnchorOffset));

					const context = canvas.getContext('2d');
					context.drawImage(image, -Math.floor(image.naturalWidth * lastAnchoredCapture.bufferAnchorOffset), 0);

					done(<img src={canvas.toDataURL()} />);
				};

				image.src = `/capture/${lastAnchoredCapture.id}`;
			});
		}
	}

	render() {


		this.cropper = new CropComponent(`/capture/${this.parameters.captureId}`, this.inset, () => {})
			.addHandle('left', 'x', false, this.referenceImage && <ui-reference>
				{this.referenceImage}
			</ui-reference>)

		return <ui-anchor>
			<ui-hint>
				Set anchor to bottom corner of the buffer or the item limiting the railcars length in the length over buffer measurement.
			</ui-hint>

			{this.cropper}

			<ui-actions>
				<ui-action ui-click={() => {
					// do not wait, as the query needs to load the entire capture
					new RailcarService().setAnchor(this.parameters.captureId, this.inset.left);

					this.navigate('../..');
				}}>
					Set Anchor
				</ui-action>
			</ui-actions>
		</ui-anchor>
	}
}
