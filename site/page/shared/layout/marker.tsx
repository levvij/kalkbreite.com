import { Component } from "@acryps/page";
import { Section, SectionPosition } from "@packtrack/layout";
import { LayoutComponent } from ".";
import { ColorValue } from "@acryps/style";

export class LayoutMarker extends Component {
	pointLength = 10;

	marker: SVGPathElement;

	onClick: () => {};

	constructor(
		private readonly layout: LayoutComponent,

		public color: ColorValue,

		public start: SectionPosition,
		public end?: SectionPosition
	) {
		super();
	}

	remove() {
		this.layout.elementContainer.removeChild(this.rootNode);
	}

	render() {
		let start = this.start;
		let end = this.end;

		// add some to both ends to make a single point visible
		if (!end) {
			// advance may extend beyond rail end, fall back to rail end
			try {
				start = this.start.advance(-this.pointLength / 2);
			} catch {}

			try {
				end = this.start.advance(this.pointLength / 2);
			} catch {
				end = this.start;
			}
		}

		const trail = this.start.section.getTilesInRange(start, end);
		console.log(trail)

		const pathSegments = [];
		let length = 0;

		for (let tile of trail.tiles) {
			pathSegments.push(tile.pattern.path(pathSegments.length != 0, tile.x, tile.y));
			length += tile.pattern.length;
		}

		this.marker = document.createElementNS(this.layout.canvas.namespaceURI, 'path') as SVGPathElement;
		this.marker.setAttribute('ui-marker', '');
		this.marker.setAttribute('d', pathSegments.join(' '));
		this.marker.setAttribute('stroke', this.color.toString());

		this.marker.setAttribute('pathLength', length.toString());

		this.marker.setAttribute('stroke-dasharray', [
			0,
			trail.offset.start,
			length - trail.offset.end + trail.offset.start,
			length
		].join(' '));

		this.marker.onclick = () => {
			this.onClick?.();
			this.layout.onMarkerClick?.(this);
		}

		return this.marker;
	}

	move(start: SectionPosition, end?: SectionPosition) {
		this.start = start;
		this.end = end;

		this.update();
	}
}
