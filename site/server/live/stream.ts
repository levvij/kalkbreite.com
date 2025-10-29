import { Browser, launch, Page } from "puppeteer-core";
import { Camera, CameraBlackout } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { Canvas, CanvasRenderingContext2D, loadImage, loadImageData } from "skia-canvas";
import { randomUUID } from "crypto";

export class LiveStreamer {
	static browser: Browser;

	readonly pageWidth = 1000;
	readonly pageHeight = 700;

	page: Page;

	canvas: Canvas;
	context: CanvasRenderingContext2D;
	blackouts: CameraBlackout[];

	listeners = new Set<(image: Buffer) => void>();

	constructor(
		public camera: Camera
	) {}

	static async start() {
		this.browser = await launch({
			executablePath: process.env.BROWSER_APPLICATION_PATH
		});
	}

	async start() {
		this.blackouts = await this.camera.blackouts.toArray();

		this.page = await LiveStreamer.browser.newPage();
		await this.page.goto(this.camera.streamSource);

		await this.page.setViewport({
			width: this.pageWidth,
			height: this.pageHeight,
			deviceScaleFactor: 1
		});

		// wait for video to appear
		await this.page.waitForSelector('video');

		// get boundary
		const width = await this.page.evaluate(() => document.querySelector('video').getBoundingClientRect().width);
		const height = await this.page.evaluate(() => document.querySelector('video').getBoundingClientRect().height);
		const x = await this.page.evaluate(() => document.querySelector('video').getBoundingClientRect().x);
		const y = await this.page.evaluate(() => document.querySelector('video').getBoundingClientRect().y);

		// remove the border radius that makes weird edges on stream
		await this.page.evaluate(() => {
			let tip = document.querySelector('video') as HTMLElement;

			while (tip.parentElement) {
				tip.style.borderRadius = 'none';

				tip = tip.parentElement;
			}
		});

		// prepare rendering canvas
		this.canvas = new Canvas(width * this.camera.resolution, height * this.camera.resolution);
		this.context = this.canvas.getContext('2d');

		// start recording
		this.nextFrame(width, height, x, y);
	}

	async nextFrame(width: number, height: number, x: number, y: number) {
		// only record if anyone is watching
		if (this.listeners.size > 0) {
			const frame = await this.page.screenshot({
				clip: { width, height, x, y },
				optimizeForSpeed: true,
				type: 'png'
			});

			this.context.drawImage(
				await loadImage(Buffer.from(frame)),
				0, 0,
				width * this.camera.resolution,
				height * this.camera.resolution
			);

			for (let blackout of this.blackouts) {
				// todo black out areas
			}

			const image = await this.canvas.toBuffer('jpg', { quality: 0.3 });

			for (let listener of this.listeners) {
				listener(image);
			}
		}

		setTimeout(() => this.nextFrame(width, height, x, y), this.camera.frameInterval);
	}

	register(app: ManagedServer) {
		app.app.get(`/stream/${this.camera.id}`, (request, response) => {
			const boundary = `frame-${randomUUID()}`;

			response.writeHead(200, {
				'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
				'pragma': 'no-cache',
				'Content-Type': `multipart/x-mixed-replace; boundary=${boundary}`,
				'Connection': 'close'
			});

			const handler = (frame: Buffer) => {
				response.write(`--${boundary}\r\n`);
				response.write('Content-Type: image/jpeg\r\n');
				response.write(`Content-Length: ${frame.length}\r\n\r\n`);
				response.write(frame);
				response.write('\r\n');
			};

			this.listeners.add(handler);
			response.on('close', () => this.listeners.delete(handler));
		});
	}
}
