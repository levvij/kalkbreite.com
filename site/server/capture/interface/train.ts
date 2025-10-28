import { Canvas, Image, loadImage } from "skia-canvas";
import { RailcarDirection } from "../../managed/database";
import { ManagedServer } from "../../managed/server";
import { TrainChain } from "../../train/chain";
import { captureBackgroundColor } from "../../../page/index.style";
import { CoupledUnit } from "../../train/chain/railcar";

export const registerTrainCaptureInterface = (server: ManagedServer, chain: TrainChain) => {
	const height = 100;

	const registerRoute = (
		route: string,
		reverse: (parameters: any) => boolean,
		transformDirection: (unit: CoupledUnit, parameters: any) => RailcarDirection
	) => {
		const trainCache = new Map<string, Buffer>();

		server.app.get(route, async (request, response) => {
			const identifier = request.params.identifier;
			const train = chain.trains.find(train => train.identifier == identifier);

			const reversed = reverse(request.params);
			const cacheIdentifier = [
				identifier,
				reversed ? 'reversed' : 'forward',
				...train.units.flatMap(unit => unit.railcar.tag + (unit.direction == RailcarDirection.forward ? '/f' : '/r'))
			].join('-');

			if (request.headers['if-none-match'] == cacheIdentifier) {
				return response.status(304).end();
			}

			if (trainCache.has(cacheIdentifier)) {
				response.set({
					'content-type': 'image/jpeg',
					'cache-control': 'public, max-age=31536000',
					'etag': cacheIdentifier
				});

				response.end(trainCache.get(cacheIdentifier));

				return;
			}

			const thumbnails: Image[] = [];

			const canvas = new Canvas(height, height);
			const context = canvas.getContext('2d');

			for (let unit of train.units) {
				const direction = transformDirection(unit, request.params);

				const capture = await unit.railcar.captures
					.includeTree({ thumbnail: true })
					.where(capture => capture.direction == direction)
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
					context.fillText(unit.railcar.tag, height / 2, height / 2);

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
		unit => unit.direction
	);

	registerRoute(
		'/capture/train/:identifier/:direction',
		parameters => parameters.direction == RailcarDirection.reverse,
		(unit, parameters) => {
			if (parameters.direction == RailcarDirection.forward) {
				return unit.direction;
			}

			if (unit.direction == RailcarDirection.forward) {
				return RailcarDirection.reverse;
			}

			return RailcarDirection.forward;
		}
	);
}
