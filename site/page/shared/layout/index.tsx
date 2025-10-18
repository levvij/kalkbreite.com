import { Component } from "@acryps/page";
import { District, Layout, Section, Tile } from '@packtrack/layout';
import { LayoutLoader } from "./loader";
import { LayoutMarker } from "./marker";
import { ColorValue } from "@acryps/style";

export class LayoutComponent extends Component {
	layout: Layout;
	canvas: SVGElement;

	highlighted: Section;

	elements: LayoutMarker[] = [];
	elementContainer: SVGGElement;

	onSectionClick: (segment: Section) => {};

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

		const svg = proxy.firstChild as SVGElement;

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

		for (let x = grid.left; x <= grid.right; x++) {
			for (let y = grid.top; y <= grid.bottom; y++) {
				const brick = document.createElementNS(svg.namespaceURI, 'rect') as SVGRectElement;
				brick.setAttribute('x', x.toString());
				brick.setAttribute('y', y.toString());

				svg.appendChild(brick);
			}
		}

		for (let root of this.layout.districts) {
			this.renderDistrict(root, svg);
		}

		this.canvas = svg;

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
		const backdrop = document.createElementNS(svg.namespaceURI, 'path') as SVGGElement;
		backdrop.setAttribute('ui-backdrop', '');
		backdrop.setAttribute('d', pathSegments.join(' '));

		backdrop.onclick = () => this.onSectionClick(section);

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
