import { Canvas, Image, loadImage } from "skia-canvas";
import { DbContext, RailcarDirection } from "../../managed/database";
import { ManagedServer } from "../../managed/server";
import { captureBackgroundColor } from "../../../page/index.style";
import { createHash } from "crypto";
import { Railcar } from "@packtrack/train";
import { Application } from "../..";

export const registerTrainCaptureInterface = (server: ManagedServer, database: DbContext) => {
	const height = 100;

	const registerRoute = (
		route: string,
		reverse: (parameters: any) => boolean,
		transformDirection: (railcar: Railcar, parameters: any) => RailcarDirection
	) => {
		const trainCache = new Map<string, Buffer>();

		server.app.get(route, async (request, response) => {
			const identifier = request.params.identifier;
			const train = Application.trainChain.trains.find(train => train.identifier == identifier);

			const reversed = reverse(request.params);

			const cacheIdentifierHash = createHash('sha1')
				.update(identifier)
				.update(reversed ? 'reversed' : 'forward');

			for (let railcar of train.railcars) {
				cacheIdentifierHash.update(railcar.identifier + (railcar.reversed ? '/f' : '/r'));
			}

			const cacheIdentifier = cacheIdentifierHash.digest('hex');

			if (request.headers['if-none-match'] == cacheIdentifier) {
				return response.status(304).end();
			}

			if (trainCache.has(cacheIdentifier)) {
				response.set({
					'content-type': 'image/jpeg',
					'cache-control': 'public, max-age=0, must-revalidate',
					'etag': cacheIdentifier
				});

				response.end(trainCache.get(cacheIdentifier));

				return;
			}

			const thumbnails: Image[] = [];

			const canvas = new Canvas(height, height);
			const context = canvas.getContext('2d');

			for (let railcar of train.railcars) {
				const storedRailcar = await database.railcar.first(stored => stored.id == railcar.identifier);
				const direction = transformDirection(railcar, request.params);

				const capture = await storedRailcar.captures
					.where(capture => capture.direction == direction)
					.includeTree({ thumbnail: true })
					.orderByDescending(capture => capture.captured)
					.first();

				if (capture) {
					// scale thumbnail to union size
					const image = await loadImage(capture.thumbnail);
					canvas.width = height / image.height * image.width;
					context.drawImage(image, 0, 0, canvas.width, height);

					thumbnails.push(await loadImage(await canvas.toBuffer('png')));
				} else {
					// render placeholder
					canvas.width = height;

					context.fillStyle = captureBackgroundColor.toValueString();
					context.fillRect(0, 0, height, height);

					context.moveTo(0, 0);
					context.lineTo(height, height);
					context.moveTo(height, 0);
					context.lineTo(0, height);
					context.stroke();

					context.fillRect(
						height / 4, height / 4,
						height / 2, height / 2
					);

					context.fillStyle = 'black';
					context.textAlign = 'center';
					context.textBaseline = 'middle';
					context.font = `${height / 4}px monospace`;
					context.fillText(storedRailcar.tag, height / 2, height / 2);

					thumbnails.push(await loadImage(await canvas.toBuffer('png')));
				}
			}

			if (reversed) {
				thumbnails.reverse();
			}

			canvas.width = thumbnails.reduce((sum, thumbnail) => sum + thumbnail.width, 0);

			let x = 0;

			for (let railcar of thumbnails) {
				context.drawImage(railcar, x, 0);
				x += railcar.width;
			}

			response.set({
				'content-type': 'image/jpeg',
				'cache-control': 'public, max-age=31536000',
				'etag': cacheIdentifier
			});

			const buffer = await canvas.toBuffer('jpg');
			trainCache.set(cacheIdentifier, buffer);

			response.end(buffer);
		});
	}

	registerRoute(
		'/capture/train/:identifier',
		() => false,
		railcar => railcar.reversed ? RailcarDirection.reverse : RailcarDirection.forward
	);

	registerRoute(
		'/capture/train/:identifier/:direction',
		parameters => parameters.direction == RailcarDirection.reverse,
		(railcar, parameters) => {
			if (parameters.direction == RailcarDirection.forward) {
				return railcar.reversed ? RailcarDirection.reverse : RailcarDirection.forward
			}

			return railcar.reversed ? RailcarDirection.forward : RailcarDirection.reverse;
		}
	);
}
