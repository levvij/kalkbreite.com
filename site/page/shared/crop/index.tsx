import { Component } from "@acryps/page";
import { ContentAppendable, percentage } from "@acryps/style";

type Handle = {
	property: string;
	direction: 'x' | 'y';
	inverted: boolean,
	content: ContentAppendable
}

export class CropComponent<ItemType> extends Component {
	source: HTMLImageElement;

	handles: Handle[] = [];

	constructor(
		private sourceLink: string,
		private item: ItemType,
		private save: () => void
	) {
		super();
	}

	addHandle(property: keyof ItemType, direction: 'x' | 'y', inverted = false, content?: ContentAppendable) {
		this.handles.push({
			property: property as string,
			direction,
			inverted,
			content
		});

		return this;
	}

	render() {
		return <ui-crop>
			<ui-canvas>
				{this.source = <img src={this.sourceLink} />}

				{this.handles.map(handle => this.renderHandle(
					handle.property as keyof ItemType,
					handle.direction,
					handle.inverted,
					handle.content
				))}
			</ui-canvas>
		</ui-crop>
	}

	renderHandle(property: keyof ItemType, direction: 'x' | 'y', inverted = false, content: ContentAppendable) {
		const handle: HTMLElement = <ui-handle>
			{content}
		</ui-handle>;

		const element: HTMLElement = <ui-crop ui-property={property}>
			{handle}
		</ui-crop>;

		const update = () => {
			let distance = this.item[property] as number;

			element.style[direction == 'x' ? 'width' : 'height'] = percentage(100 * distance).toValueString();
		}

		update();

		let movement: { start: number, value: number, range: number };

		handle.onmousedown = event => {
			movement = {
				start: direction == 'x' ? event.clientX : event.clientY,
				value: this.item[property] as number,
				range: direction == 'x' ? element.parentElement.clientWidth : element.parentElement.clientHeight
			};
		};

		handle.onmousemove = event => {
			if (movement) {
				const delta = movement.start - (direction == 'x' ? event.clientX : event.clientY);
				const scaled = delta / movement.range;

				if (inverted) {
					this.item[property] = movement.value + scaled as any;
				} else {
					this.item[property] = movement.value - scaled as any;
				}


				update();

				this.save();
			}
		};

		handle.onmouseout = handle.onmouseup = () => {
			movement = null;
		};

		return element;
	}
}
