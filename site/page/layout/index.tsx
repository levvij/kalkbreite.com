import { Component } from "@acryps/page";
import { District, Layout, Section } from '@packtrack/layout';

export class LayoutPage extends Component {
	layout: Layout;

	async onload() {
		let source = await fetch('/layout/source/index.rml').then(response => response.text());

		// remove <!rml> that the brwoser parser cannot read
		source = source.split('\n').slice(1).join('\n');

		const document = new DOMParser().parseFromString(source, 'application/xml');

		this.layout = Layout.from(document);
		console.log(this.layout)
	}

	render() {
		const proxy = document.createElement('proxy');
		proxy.innerHTML = '<svg />';

		const svg = proxy.firstChild as SVGElement;

		const tiles = this.layout.allDistricts.flatMap(district => district.sections.flatMap(section => section.tiles));
		const top = Math.min(...tiles.map(tile => tile.y));
		const left = Math.min(...tiles.map(tile => tile.x));
		const right = Math.max(...tiles.map(tile => tile.x));
		const bottom = Math.max(...tiles.map(tile => tile.y));

		svg.setAttribute('viewBox', `${left} ${top} ${right - left + 1} ${bottom - top + 1}`);

		for (let x = left; x <= right; x++) {
			for (let y = top; y <= bottom; y++) {
				const brick = document.createElementNS(svg.namespaceURI, 'rect') as SVGRectElement;
				brick.setAttribute('x', x.toString());
				brick.setAttribute('y', y.toString());

				svg.appendChild(brick);
			}
		}

		for (let root of this.layout.districts) {
			this.renderDistrict(root, svg);
		}

		return <ui-layout>
			{svg}
		</ui-layout>
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

		const pathSegments = [];

		for (let tile of section.tiles) {
			pathSegments.push(tile.pattern.path(false, tile.x, tile.y));
		}

		const path = document.createElementNS(svg.namespaceURI, 'path') as SVGGElement;
		path.setAttribute('d', pathSegments.join(' '));

		group.insertBefore(path, group.firstChild);
	}
}
