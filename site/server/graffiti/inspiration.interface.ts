import { DbContext, GraffitiInspirationMedia } from "../managed/database";
import { ManagedServer } from "../managed/server";

export const registerGraffitiInspirationCaptureInterface = (server: ManagedServer, database: DbContext) => {
	const cache = new Map<string, GraffitiInspirationMedia>();

	server.app.get(`/capture/graffiti/inspiration/:id`, async (request, response) => {
		const id = request.params.id;

		if (cache.has(id)) {
			const media = cache.get(id);

			response.contentType(media.mimeType);
			response.end(media.thumbnail);

			return;
		}

		const media = await database.graffitiInspirationMedia
			.includeTree({
				mimeType: true,
				thumbnail: true
			})
			.first(media => media.id == id);

		if (!media) {
			return response.status(404).end('not found');
		}

		if (media.mimeType?.startsWith('image/') && media.thumbnail) {
			cache.set(id, media);

			response.contentType('image/jpeg');
			response.end(media.thumbnail);

			return;
		}

		// download full blob
		await media.backload({ data: true });

		// do not cache other media (videos, ...)
		response.contentType(media.mimeType);
		response.end(media.data);
	});
}
