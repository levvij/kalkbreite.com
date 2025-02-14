import { Capture, DbContext } from "../managed/database";
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
}
