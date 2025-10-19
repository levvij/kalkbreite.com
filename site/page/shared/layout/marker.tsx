import { Component } from "@acryps/page";
import { Section } from "@packtrack/layout";
import { LayoutComponent } from ".";
import { ColorValue } from "@acryps/style";

export class LayoutMarker extends Component {
	marker: SVGPathElement;

	constructor(
		private readonly layout: LayoutComponent,

		public color: ColorValue,

		public section: Section,
		public start: number,
		public end?: number
	) {
		super();
	}

	remove() {
		this.layout.elementContainer.removeChild(this.rootNode);
	}

	render() {
		const pathSegments = [];

		for (let tile of this.section.tiles) {
			pathSegments.push(tile.pattern.path(pathSegments.length != 0, tile.x, tile.y));
		}

		this.marker = document.createElementNS(this.layout.canvas.namespaceURI, 'path') as SVGPathElement;
		this.marker.setAttribute('ui-marker', '');
		this.marker.setAttribute('d', pathSegments.join(' '));
		this.marker.setAttribute('stroke', this.color.toString());
		this.move(this.start, this.end);

		this.marker.onclick = () => this.layout.onMarkerClick?.(this);

		return this.marker;
	}

	move(start: number, end?: number, time = 100) {
		this.start = start;
		this.end = end;

		const offset = this.start / this.section.length;
		const length = (this.end ?? this.start + 10) / this.section.length - offset;

		this.marker.setAttribute('pathLength', '1');
		this.marker.setAttribute('stroke-dasharray', `0 ${offset} ${length} 1`);
		this.marker.style.transition = `${time}ms stroke-dasharray`;
		this.marker.style.transitionTimingFunction = 'linear';
	}
}
