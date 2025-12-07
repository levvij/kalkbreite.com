import { Component } from "@acryps/page";
import { GraffitiPage } from "..";
import { GraffitiCaptureViewModel, GraffitiService } from "../../../managed/services";
import { cropGraffiti } from "../../../../shared/crop-graffiti";
import { CropComponent } from "../../../shared/crop";

type Inset = { top: number, left: number, right: number, bottom: number };

export class AssignGraffitiBoundsPage extends Component {
	declare parent: GraffitiPage;
	declare parameters: { captureId };

	capture: GraffitiCaptureViewModel;

	canvas: HTMLCanvasElement;

	inset = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}

	cropper: CropComponent<Inset>;

	async onload() {
		this.capture = new GraffitiCaptureViewModel();
		this.capture.sourceId = this.parameters.captureId;
	}

	render() {
		this.canvas = document.createElement('canvas');

		this.cropper = new CropComponent(`/capture/${this.parameters.captureId}`, this.inset, () => this.updateCapture())
			.addHandle('top', 'y')
			.addHandle('left', 'x')
			.addHandle('right', 'x', true)
			.addHandle('bottom', 'y', true);

		return <ui-assign>
			{this.cropper}
			{this.canvas}

			<ui-actions>
				<ui-action ui-click-text='Rendering Capture...' ui-click={async () => {
					await new GraffitiService().assign(this.parent.graffiti.id, this.capture);

					this.navigate('../..');
				}}>
					Save Capture
				</ui-action>
			</ui-actions>
		</ui-assign>
	}

	updateCapture() {
		this.capture.top = this.inset.top;
		this.capture.left = this.inset.left;

		this.capture.width = 1 - this.inset.left - this.inset.right;
		this.capture.height = 1 - this.inset.top - this.inset.bottom;

		cropGraffiti(this.canvas, this.cropper.source, this.capture.left, this.capture.top, this.capture.width, this.capture.height);
	}
}
