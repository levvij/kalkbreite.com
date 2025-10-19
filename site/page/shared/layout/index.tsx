import { Component } from "@acryps/page";
import { District, Layout, Section, SectionPosition, Tile } from '@packtrack/layout';
import { LayoutLoader } from "./loader";
import { LayoutMarker } from "./marker";
import { ColorValue } from "@acryps/style";
import { off } from "process";

export class LayoutComponent extends Component {
	layout: Layout;
	canvas: SVGSVGElement;

	highlighted: Section;

	elements: LayoutMarker[] = [];
	elementContainer: SVGGElement;

	onSectionClick: (position: SectionPosition) => void;
	onMarkerClick: (marker: LayoutMarker) => void;

	async onload() {
		this.layout = await LayoutLoader.load();
	}

	highlight(section: Section) {
		this.highlighted = section;

		this.layout && this.update();
	}

	mark(color: ColorValue, section: Section, start: number, end?: number) {
		const marker = new LayoutMarker(this, color, section, start, end);
		this.elements.push(marker);

		if (this.elementContainer) {
			marker.host(this.elementContainer);
		}

		return marker;
	}

	render() {
		const proxy = document.createElement('proxy');
		proxy.innerHTML = '<svg />';

		const svg = proxy.firstChild as SVGSVGElement;

		const tiles = this.layout.allDistricts.flatMap(district => district.sections.flatMap(section => section.tiles));

		let viewBoxTiles: Tile[];
		let margin = 0;

		if (this.highlighted) {
			viewBoxTiles = this.highlighted.tiles;
			margin = 2;
		} else {
			viewBoxTiles = tiles;
		}

		const viewBox = this.getBoundary(viewBoxTiles, margin);
		svg.setAttribute('viewBox', `${viewBox.left} ${viewBox.top} ${viewBox.right - viewBox.left + 1} ${viewBox.bottom - viewBox.top + 1}`);

		const grid = this.getBoundary(tiles);
		const overscan = Math.max(grid.right - grid.left, grid.bottom - grid.top);

		for (let x = grid.left - overscan; x <= grid.right + overscan; x++) {
			for (let y = grid.top - overscan; y <= grid.bottom + overscan; y++) {
				const brick = document.createElementNS(svg.namespaceURI, 'rect') as SVGRectElement;
				brick.setAttribute('x', x.toString());
				brick.setAttribute('y', y.toString());

				svg.appendChild(brick);
			}
		}

		this.canvas = svg;

		for (let root of this.layout.districts) {
			this.renderDistrict(root, svg);
		}

		this.elementContainer = document.createElementNS(svg.namespaceURI, 'g') as SVGGElement;
		svg.appendChild(this.elementContainer);

		for (let element of this.elements) {
			element.host(this.elementContainer);
		}

		return <ui-layout>
			{svg}
		</ui-layout>;
	}

	renderDistrict(district: District, svg: SVGElement | SVGGElement) {
		const group = document.createElementNS(svg.namespaceURI, 'g') as SVGGElement;
		group.setAttribute('ui-domain-name', district.domainName);
		svg.appendChild(group);

		for (let section of district.sections) {
			this.renderSection(section, group);
		}

		for (let child of district.children) {
			this.renderDistrict(child, group);
		}
	}

	renderSection(section: Section, svg: SVGGElement) {
		const group = document.createElementNS(svg.namespaceURI, 'g') as SVGGElement;
		group.setAttribute('ui-domain-name', section.domainName);
		svg.appendChild(group);

		if (this.highlighted == section) {
			group.setAttribute('ui-highlight', '');
		}

		const pathSegments = [];

		for (let tile of section.tiles) {
			pathSegments.push(tile.pattern.path(pathSegments.length != 0, tile.x, tile.y));
		}

		const path = document.createElementNS(svg.namespaceURI, 'path') as SVGGElement;
		path.setAttribute('ui-main', '');
		path.setAttribute('d', pathSegments.join(' '));

		group.insertBefore(path, group.firstChild);

		// makes the path easily clickable
		const backdrop = document.createElementNS(svg.namespaceURI, 'path') as SVGPathElement;
		backdrop.setAttribute('ui-backdrop', '');
		backdrop.setAttribute('d', pathSegments.join(' '));
		backdrop.setAttribute('pathLength', '1');

		backdrop.onclick = event => {
			const point = this.canvas.createSVGPoint();
			point.x = event.clientX;
			point.y = event.clientY;

			const translated = point.matrixTransform(svg.getScreenCTM().inverse());

			const findClick = (start: number, length: number) => {
				// stop at one meter percision
				if (length < 1 / section.length) {
					backdrop.removeAttribute('stroke-dasharray');

					this.onSectionClick(new SectionPosition(section, Math.round(start * section.length), false));

					return;
				}

				for (let offset of [start, start + length / 2]) {
					backdrop.setAttribute('stroke-dasharray', `0 ${offset} ${length / 2} 1`);

					if (backdrop.isPointInStroke(translated)) {
						findClick(offset, length / 2);

						return;
					}
				}
			};

			findClick(0, 1);

			// this.onSectionClick(section)
		};

		group.insertBefore(backdrop, path);
	}

	getBoundary(tiles: Tile[], margin = 0) {
		return {
			top: Math.min(...tiles.map(tile => tile.y)) - margin,
			left: Math.min(...tiles.map(tile => tile.x)) - margin,
			right: Math.max(...tiles.map(tile => tile.x)) + margin,
			bottom: Math.max(...tiles.map(tile => tile.y)) + margin
		}
	}
}
