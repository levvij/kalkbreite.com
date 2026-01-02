import { Canvas } from "skia-canvas";
import { Capture, CaptureFrame, CaptureSession, DbContext, GraffitiCapture, RailcarDirection } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { updateThumbnail } from "./thumbnail";
import { registerCaptureSessionInterface } from "./session";
import { registerTrainCaptureInterface } from "./interface/train";
import { registerTrainRailcarCaptureInterface } from "./interface/train-railcar";

export const registerCaptureInterface = (server: ManagedServer, database: DbContext) => {
	registerTrainCaptureInterface(server, database);

	const emptyCanvas = new Canvas(1, 1);
	emptyCanvas.getContext('2d');

	const empty = emptyCanvas.toBufferSync('png');

	const thumbnailCache = new Map<string, Capture | GraffitiCapture>();
	const imageCache = new Map<string, Capture>();

	registerCaptureSessionInterface(server, database);
	registerTrainRailcarCaptureInterface(server, database, empty);

	server.app.get('/capture/random', async (request, response) => {
		const thumbnails = [...thumbnailCache.values()];

		if (!thumbnails.length) {
			response.status(404).end();
		}

		response.contentType('image/jpeg');
		response.end(thumbnails[Math.floor(thumbnails.length * Math.random())].thumbnail);
	});

	server.app.get('/capture/:id', async (request, response) => {
		const id = request.params.id;

		if (request.headers['if-none-match'] == id) {
			return response.status(304).end();
		}

		let capture = thumbnailCache.get(id);

		if (!capture) {
			capture = await database.capture
				.includeTree({ thumbnail: true })
				.first(capture => capture.id == id);

			if (!capture) {
				response.contentType('image/png');
				response.end(empty);

				return;
			}

			thumbnailCache.set(id, capture);
		}

		response.set({
			'content-type': 'image/jpeg',
			'cache-control': 'public, max-age=31536000, immutable',
			'etag': id
		});

		response.end(capture.thumbnail);
	});

	server.app.get('/capture/graffiti/:id', async (request, response) => {
		const id = request.params.id;

		let capture = thumbnailCache.get(id);

		if (!capture) {
			capture = await database.graffitiCapture
				.includeTree({ thumbnail: true })
				.orderByDescending(capture => capture.capture.captured)
				.first(capture => capture.graffitiId == id);

			if (!capture) {
				response.contentType('image/png');
				response.end(empty);

				return;
			}

			thumbnailCache.set(id, capture);
		}

		response.contentType('image/jpeg');
		response.end(capture.thumbnail);
	});

	server.app.get('/capture/graffiti/capture/:id', async (request, response) => {
		const id = request.params.id;

		let capture = thumbnailCache.get(id);

		if (!capture) {
			capture = await database.graffitiCapture
				.includeTree({ thumbnail: true })
				.orderByDescending(capture => capture.capture.captured)
				.first(capture => capture.id == id);

			if (!capture) {
				response.contentType('image/png');
				response.end(empty);

				return;
			}

			thumbnailCache.set(id, capture);
		}

		response.contentType('image/jpeg');
		response.end(capture.thumbnail);
	});

	server.app.get('/capture/railcar/:id', async (request, response) => {
		const id = request.params.id;

		const lastCapture = await database.capture
			.orderByDescending(capture => capture.captured)
			.includeTree({ id: true })
			.first(capture => capture.railcarId == id);

		if (!lastCapture) {
			response.contentType('image/png');
			response.end(empty);

			return;
		}

		let capture = thumbnailCache.get(lastCapture.id);

		if (!capture) {
			capture = await database.capture
				.includeTree({ thumbnail: true })
				.first(capture => capture.id == lastCapture.id);

			thumbnailCache.set(lastCapture.id, capture);
		}

		response.contentType('image/jpeg');
		response.end(capture.thumbnail);
	});

	server.app.get('/capture/railcar/:id/:side', async (request, response) => {
		const id = request.params.id;
		const direction = request.params.side as RailcarDirection;

		const lastCapture = await database.capture
			.orderByDescending(capture => capture.captured)
			.includeTree({ id: true })
			.where(capture => capture.direction == direction)
			.first(capture => capture.railcarId == id);

		if (!lastCapture) {
			response.contentType('image/png');
			response.end(empty);

			return;
		}

		let capture = thumbnailCache.get(lastCapture.id);

		if (!capture) {
			capture = await database.capture
				.includeTree({ thumbnail: true })
				.first(capture => capture.id == lastCapture.id);

			thumbnailCache.set(lastCapture.id, capture);
		}

		response.contentType('image/jpeg');
		response.end(capture.thumbnail);
	});

	server.app.get('/capture/:id/full', async (request, response) => {
		const id = request.params.id;

		let capture = imageCache.get(id);

		if (!capture) {
			capture = await database.capture
				.orderByDescending(capture => capture.captured)
				.includeTree({ mimeType: true, data: true })
				.first(capture => capture.id == id);

			if (!capture) {
				response.contentType('image/png');
				response.end(empty);

				return;
			}

			imageCache.set(id, capture);
		}

		response.contentType(capture.mimeType);
		response.end(capture.data);
	});
}
