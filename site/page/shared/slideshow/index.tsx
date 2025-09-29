import { Component } from "@acryps/page";
import { px } from "@acryps/style";
import { moveDuration } from "./index.style";
import { Application } from "../..";

export class SlideshowComponent extends Component {
	declare rootNode: HTMLElement;

	readonly slideTime = 2 * 1000;

	lastSource: string;
	active: HTMLImageElement[] = [];
	index = 0;

	constructor(
		private nextLink: (index: number) => string | { image: string, item: string },
	) {
		super();
	}

	render() {
		requestAnimationFrame(() => this.nextImage());

		return <ui-slideshow></ui-slideshow>;
	}

	async nextImage() {
		const image = new Image();
		const start = +new Date();

		image.onload = () => setTimeout(() => {
			if (!document.contains(this.rootNode)) {
				return;
			}

			this.rootNode.appendChild(image);
			this.active.push(image);

			if (this.active.length == 3) {
				const removeable = this.active.shift();
				removeable.style.marginLeft = px(-removeable.clientHeight / removeable.naturalHeight * removeable.naturalWidth).toValueString();

				setTimeout(() => removeable.remove(), +moveDuration.value + this.slideTime);
			}

			this.nextImage();
		}, this.active.length < 2 ? 0 : Math.max(0, this.slideTime - (+new Date() - start)));

		const next = this.nextLink(this.index++);

		if (!next) {
			return;
		}

		if (typeof next == 'string') {
			image.src = this.lastSource = next;
		} else {
			image.src = this.lastSource = next.image;
			image.onclick = () => Application.router.navigate(next.item);
		}
	}
}
