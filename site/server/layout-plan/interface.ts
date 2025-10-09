import { writeFileSync } from "fs";
import { Canvas } from "skia-canvas";
import { JSDOM } from 'jsdom';

export class LayoutPlan {
	private points = new Map<string, PositionablePoint>();
	private tracks = new Map<string, TrackSegment>();

	constructor(
		private jmriSource: string
	) {
		const document = new JSDOM(jmriSource).window.document;

		for (let match of document.querySelectorAll('positionablepoint')) {
			this.points.set(
				match.getAttribute('ident'),
				new PositionablePoint(
					+match.getAttribute('x'),
					+match.getAttribute('y'),
					[match.getAttribute('connect1name')]
				)
			);
		}

		for (let match of document.querySelectorAll('layoutturnout, layoutSlip')) {
			this.points.set(
				match.getAttribute('ident'),
				new PositionablePoint(
					+match.getAttribute('xcen'),
					+match.getAttribute('ycen'),
					[
						match.getAttribute('connectaname'),
						match.getAttribute('connectbname'),
						match.getAttribute('connectcname'),
						match.getAttribute('connectdname')
					].filter(connect => connect)
				)
			);
		}

		const top = Math.min(...[...this.points.values()].map(point => point.y));
		const left = Math.min(...[...this.points.values()].map(point => point.x));
		const right = Math.max(...[...this.points.values()].map(point => point.x));
		const bottom = Math.max(...[...this.points.values()].map(point => point.y));

		const width = right - left;
		const height = bottom - top;

		const canvas = new Canvas(width, height);
		const context = canvas.getContext('2d');
		context.translate(-left, -top);

		for (let [identifier, point] of this.points) {
			context.fillRect(point.x, point.y, 2, 2);
		}

		context.beginPath();
		context.strokeStyle = 'red';

		for (let match of document.querySelectorAll('tracksegment')) {
			const startName = match.getAttribute('connect1name');
			const endName = match.getAttribute('connect2name');

			const start = this.points.get(startName);
			const end = this.points.get(endName);

			if (start && end) {
				console.log(match.getAttribute('ident'), match.getAttribute('connect1name'), match.getAttribute('connect2name'));

				context.moveTo(start.x, start.y);
				context.lineTo(end.x, end.y);

				this.tracks.set(match.getAttribute('ident'), new TrackSegment(start, end));
			}
		}

		context.stroke();

		writeFileSync('PLAN.png', canvas.toBufferSync('png'))

		console.log(this.points);
	}

	render() {}
}

class Point {
	constructor(
		public x: number,
		public y: number
	) {}
}

class PositionablePoint extends Point {
	constructor(
		x: number,
		y: number,

		private connections: string[]
	) {
		super(x, y);
	}
}

class TrackSegment {
	constructor(
		public start: Point,
		public end: Point
	) {}
}
