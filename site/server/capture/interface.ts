import { Capture, DbContext, RailcarDirection } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { updateThumbnail } from "./thumbnail";

export const registerCaptureInterface = (server: ManagedServer, database: DbContext) => {
	const thumbnailCache = new Map<string, Capture>();
	const imageCache = new Map<string, Capture>();

	server.app.get('/capture/random', async (request, response) => {
		const captureQuery = () => database.capture;

		const count = await captureQuery().count();

		const capture = await captureQuery()
			.skip(Math.floor(Math.random() * count))
			.includeTree({ thumbnail: true })
			.first();

		response.contentType('image/jpeg');
		response.end(capture.thumbnail);
	});

	server.app.get('/capture/:id', async (request, response) => {
		const id = request.params.id;

		let capture = thumbnailCache.get(id);

		if (!capture) {
			capture = await database.capture
				.orderByDescending(capture => capture.captured)
				.includeTree({ thumbnail: true })
				.first(capture => capture.railcarId == id);

			if (!capture) {
				response.status(404);
				response.end('capture not found');

				return;
			}

			thumbnailCache.set(id, capture);
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
				.first(capture => capture.railcarId == id);

			if (!capture) {
				response.status(404);
				response.end('capture not found');

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
