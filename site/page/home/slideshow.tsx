import { Component } from "@acryps/page";

export class SlideshowComponent extends Component {
	declare rootNode: HTMLElement;

	active: HTMLImageElement;

	render() {
		requestAnimationFrame(() => this.loadImage());

		return <ui-slideshow></ui-slideshow>;
	}

	async loadImage() {
		const image = new Image();

		image.onload = () => {
			this.rootNode.appendChild(image);

			this.active?.remove();
			this.active = image;

			setTimeout(() => this.loadImage(), 1000 * 5);
		};

		image.src = '/capture/random';
	}
}
