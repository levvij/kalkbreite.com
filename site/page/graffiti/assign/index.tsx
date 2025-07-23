import { Component } from "@acryps/page";
import { GraffitiPage } from "..";
import { GraffitiCaptureViewModel, GraffitiService } from "../../managed/services";
import { GraffitiPreviewComponent } from "../../shared/graffiti-preview";
import { Invert, left, percentage, Scale } from "@acryps/style";
import { cropGraffiti } from "../../../shared/crop-graffiti";

type Inset = { top: number, left: number, right: number, bottom: number };

export class AssignGraffitiBoundsPage extends Component {
	declare parent: GraffitiPage;
	declare parameters: { captureId };

	capture: GraffitiCaptureViewModel;

	canvas: HTMLCanvasElement;
	source: HTMLImageElement;

	inset = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}

	async onload() {
		this.capture = new GraffitiCaptureViewModel();
		this.capture.sourceId = this.parameters.captureId;
	}

	render() {
		this.canvas = document.createElement('canvas');

		return <ui-assign>
			<ui-wrapper>
				<ui-canvas>
					{this.source = <img src={`/capture/${this.parameters.captureId}`} />}

					{this.renderHandle('top', 'y')}
					{this.renderHandle('left', 'x')}
					{this.renderHandle('right', 'x', true)}
					{this.renderHandle('bottom', 'y', true)}
				</ui-canvas>
			</ui-wrapper>

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

	renderHandle(property: keyof Inset, direction: 'x' | 'y', inverted = false) {
		const handle: HTMLElement = <ui-handle></ui-handle>;

		const element: HTMLElement = <ui-crop ui-property={property}>
			{handle}
		</ui-crop>;

		const update = () => {
			let distance = this.inset[property] as number;

			element.style[direction == 'x' ? 'width' : 'height'] = percentage(100 * distance).toValueString();
		}

		update();

		let movement: { start: number, value: number, range: number };

		handle.onmousedown = event => {
			movement = {
				start: direction == 'x' ? event.clientX : event.clientY,
				value: this.inset[property] as number,
				range: direction == 'x' ? element.parentElement.clientWidth : element.parentElement.clientHeight
			};
		};

		handle.onmousemove = event => {
			if (movement) {
				const delta = movement.start - (direction == 'x' ? event.clientX : event.clientY);
				const scaled = delta / movement.range;

				if (inverted) {
					this.inset[property] = movement.value + scaled;
				} else {
					this.inset[property] = movement.value - scaled;
				}


				update();

				this.updateCapture();
			}
		};

		handle.onmouseout = handle.onmouseup = () => {
			movement = null;
		}

		return element;
	}

	updateCapture() {
		this.capture.top = this.inset.top;
		this.capture.left = this.inset.left;

		this.capture.width = 1 - this.inset.left - this.inset.right;
		this.capture.height = 1 - this.inset.top - this.inset.bottom;

		cropGraffiti(this.canvas, this.source, this.capture.left, this.capture.top, this.capture.width, this.capture.height);
	}
}
