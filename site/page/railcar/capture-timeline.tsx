import { Component } from "@acryps/page";
import { CaptureViewModel } from "../managed/services";
import { Application } from "..";

export class CaptureTimelineComponent extends Component {
	image = new Image();
	selected: CaptureViewModel;

	elements: HTMLElement[];

	constructor(
		private captures: CaptureViewModel[]
	) {
		super();
	}

	render() {
		requestAnimationFrame(() => {
			this.selectImage(this.captures[0]);
		});

		return <ui-timeline>
			{this.image}

			<ui-captures>
				{this.elements = this.captures.map(capture => <ui-capture ui-click={() => this.selectImage(capture)}>
					<img src={`/capture/${capture.id}`} />

					<ui-date>
						{capture.captured.toLocaleDateString()}
					</ui-date>

					{Application.session.account && <ui-actions>
						{capture.bufferAnchorOffset == null && <ui-action ui-href={`anchor/${capture.id}`}>
							Anchor
						</ui-action>}
					</ui-actions>}
				</ui-capture>)}
			</ui-captures>
		</ui-timeline>;
	}

	selectImage(capture: CaptureViewModel) {
		this.image.src = `/capture/${capture.id}`;
		this.selected = capture;

		for (let element of this.elements) {
			element.removeAttribute('ui-active');
		}

		this.elements[this.captures.indexOf(capture)].setAttribute('ui-active', '');
	}
}
