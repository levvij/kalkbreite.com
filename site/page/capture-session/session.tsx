import { Component } from "@acryps/page";
import { CaptureSessionViewModel } from "../managed/services";
import { Application } from "..";
import { bufferOffsetIcon } from "../.built/icons";
import { bufferAnchorOffset } from "../railcar/railcar/index.style";

export class CaptureSessionComponent extends Component {
	marker: HTMLElement;
	offset: number;

	private image: HTMLImageElement;
	private container: HTMLElement;
	private scroller: HTMLElement;

	constructor(
		private session: CaptureSessionViewModel
	) {
		super();
	}

	render() {
		this.image = <img src={`/capture/session/${this.session.id}`} loading='lazy' />;

		this.container = <ui-container>
			{this.image}
		</ui-container>;

		this.scroller = <ui-image>
			{this.container}
		</ui-image>;

		this.image.draggable = false;

		if (Application.session.account) {
			this.image.onclick = (event: MouseEvent | TouchEvent) => {
				if (!this.marker) {
					this.container.appendChild(this.marker = <ui-marker>
						<ui-action ui-click={() => this.navigate(`assign/${this.session.id}/${this.offset.toString().substring(2, 10)}`)}>
							{bufferOffsetIcon()}
						</ui-action>
					</ui-marker>);
				}

				this.handleClick(event);
			}

			this.image.ontouchstart = this.image.onmousemove = this.image.ontouchmove = (event: MouseEvent | TouchEvent) => this.handleClick(event);
		};

		return <ui-capture-session>
			<ui-timestamp>
				{this.session.captured.toLocaleString()}
			</ui-timestamp>

			{this.scroller}

			{Application.session.account && <ui-actions>
				<ui-action>
					Mark as corrupted
				</ui-action>

				<ui-action>
					Mark as reviewed
				</ui-action>
			</ui-actions>}
		</ui-capture-session>
	}

	handleClick(event: MouseEvent | TouchEvent) {
		if (!this.marker) {
			return;
		}

		if (event instanceof MouseEvent) {
			if (!event.buttons && event.type != 'click') {
				return;
			}
		}

		const carrier: Touch | MouseEvent = event instanceof TouchEvent ? event.touches[0] : event;
		const target = carrier.clientX - this.container.getBoundingClientRect().x;

		const translated = 1 / this.image.getBoundingClientRect().width * target;
		this.offset = translated;

		this.marker.style.setProperty(bufferAnchorOffset.propertyName, translated.toString());

		event.preventDefault();
	}
}
