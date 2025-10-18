import { Canvas } from "skia-canvas";
import { Capture, CaptureFrame, CaptureSession, DbContext, GraffitiCapture, RailcarDirection } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { updateThumbnail } from "./thumbnail";
import { registerCaptureSessionInterface } from "./session";
import { TrainChain } from "../train/chain";
import { reverse } from "../../shared/direction";

export const registerCaptureInterface = (server: ManagedServer, database: DbContext, chain: TrainChain) => {
	const emptyCanvas = new Canvas(1, 1);
	emptyCanvas.getContext('2d');

	const empty = emptyCanvas.toBufferSync('png');

	const thumbnailCache = new Map<string, Capture | GraffitiCapture>();
	const imageCache = new Map<string, Capture>();

	registerCaptureSessionInterface(server, database);

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

	server.app.get('/capture/train/:identifier', (request, response) => {
		const train = chain.trains.find(train => train.identifier == request.params.identifier);
		const unit = train.units.at(0);

		response.redirect(`/capture/railcar/${unit.railcar.id}/${unit.direction}`);
	});

	server.app.get('/capture/train/:identifier/:direction', (request, response) => {
		const invert = request.params.direction == RailcarDirection.reverse;
		const train = chain.trains.find(train => train.identifier == request.params.identifier);
		const unit = train.units.at(invert ? -1 : 0);

		response.redirect(`/capture/railcar/${unit.railcar.id}/${invert ? reverse(unit.direction) : unit.direction}`);
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

	server.app.post('/capture/:tag/:direction', async (request, response) => {
		const tag = request.params.tag;
		const direction = request.params.direction as RailcarDirection;

		const railcar = await database.railcar.first(railcar => railcar.tag.valueOf() == tag);

		const capture = new Capture();
		capture.direction = direction;
		capture.captured = new Date();
		capture.mimeType = 'image/png';
		capture.railcar = railcar;

		await capture.create();

		const chunks = [];

		request.on('data', chunk => {
			chunks.push(chunk);
		});

		request.on('end', async () => {
			capture.data = Buffer.concat(chunks);

			await capture.update();
			await updateThumbnail(capture);

			response.sendStatus(200).end();
		});
	});
}
