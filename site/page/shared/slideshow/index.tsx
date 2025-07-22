import { Component } from "@acryps/page";

export class SlideshowComponent extends Component {
	declare rootNode: HTMLElement;

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

			setTimeout(() => this.nextImage(), 1000 * 5);
		};

		image.src = this.nextLink(this.index++);
	}
}
