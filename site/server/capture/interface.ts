import { Capture, DbContext, RailcarDirection } from "../managed/database";
import { ManagedServer } from "../managed/server";

export const registerCaptureInterface = (server: ManagedServer, database: DbContext) => {
	const cache = new Map<string, Capture>();

	server.app.get('/capture/:id', async (request, response) => {
		const id = request.params.id;

		let capture = cache.get(id);

		if (!capture) {
			capture = await database.capture
				.orderByDescending(capture => capture.captured)
				.first(capture => capture.railcarId == id);

			if (!capture) {
				response.status(404);
				response.end('capture not found');

				return;
			}

			cache.set(id, capture);
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

			response.sendStatus(200).end();
		});
	});
}
