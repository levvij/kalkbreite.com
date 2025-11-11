import { createHash } from "crypto";
import { DbContext, RailcarDirection } from "../../managed/database";
import { ManagedServer } from "../../managed/server";
import { Canvas, loadImage } from "skia-canvas";
import { lengthMultiplier } from "../../../shared/anchor-shift";

export const registerTrainRailcarCaptureInterface = (server: ManagedServer, database: DbContext, empty: Buffer) => {
	const imageCache = new Map<string, Buffer>();

	server.app.get('/capture/train/railcar/:id/:direction', async (request, response) => {
		const id = request.params.id;
		const direction = request.params.direction as RailcarDirection;

		const cacheId = `${id}${direction}`;

		const railcar = await database.railcar
			.include(railcar => railcar.model)
			.first(railcar => railcar.id == id);

		if (request.headers['if-none-match'] == cacheId) {
			return response.status(304).end();
		}

		const cached = imageCache.get(cacheId);

		if (cached) {
			response.set({
				'content-type': 'image/jpeg',
				'cache-control': 'public, max-age=31536000, immutable',
				'etag': cacheId
			});

			response.end(cached);

			return;
		}

		const capture = await railcar.captures
			.where(capture => capture.direction == direction)
			.orderByDescending(capture => capture.captured)
			.includeTree({
				thumbnail: true,
				bufferAnchorOffset: true
			})
			.first();

		if (!capture) {
			response.contentType('image/png');
			response.end(empty);

			return;
		}

		const model = await railcar.model.fetch();

		let thumbnail = capture.thumbnail;

		if (model && capture.bufferAnchorOffset) {
			const image = await loadImage(thumbnail);
			const left = image.width * capture.bufferAnchorOffset;
			const length = model.lengthIncludingBuffers / lengthMultiplier * image.height;

			const canvas = new Canvas(Math.floor(length), image.height);
			const context = canvas.getContext('2d');
			context.drawImage(image, -left, 0);

			thumbnail = await canvas.toBuffer('jpeg');

			// only allow caching of anchored images
			imageCache.set(cacheId, thumbnail);
		}

		response.set({
			'content-type': 'image/jpeg',
			'cache-control': 'public, max-age=0, must-revalidate',
			'etag': cacheId
		});

		response.end(thumbnail);
	});
};
