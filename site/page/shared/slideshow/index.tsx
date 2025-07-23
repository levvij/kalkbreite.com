import { Component } from "@acryps/page";

export class SlideshowComponent extends Component {
	declare rootNode: HTMLElement;

	lastSource: string;
	active: HTMLImageElement;
	index = 0;

	constructor(
		private nextLink: (index: number) => string
	) {
		super();
	}

	render() {
		requestAnimationFrame(() => this.nextImage());

		return <ui-slideshow></ui-slideshow>;
	}

	async nextImage() {
		const image = new Image();

		image.onload = () => {
			this.rootNode.appendChild(image);

			this.active?.remove();
			this.active = image;

			if (document.contains(this.rootNode)) {
				setTimeout(() => this.nextImage(), 1000 * 2);
			}
		};

		const next = this.nextLink(this.index++);

		if (next == this.lastSource) {
			return;
		}

		image.src = this.lastSource = next;
	}
}
