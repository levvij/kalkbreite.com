import { Canvas, Image, loadImage } from "skia-canvas";
import { DbContext } from "../../managed/database";
import { ManagedServer } from "../../managed/server";
import { TrainChain } from "../../train/chain";
import { captureBackgroundColor } from "../../../page/index.style";

export const registerTrainCaptureInterface = (server: ManagedServer, database: DbContext, chain: TrainChain) => {
	const height = 100;
	const trainCache = new Map<string, Buffer>();

	server.app.get('/capture/train/:identifier', async (request, response) => {
		const identifier = request.params.identifier;

		if (request.headers['if-none-match'] == identifier) {
			return response.status(304).end();
		}

		if (trainCache.has(identifier)) {
			response.set({
				'content-type': 'image/jpeg',
				'cache-control': 'public, max-age=31536000, immutable',
				'etag': identifier
			});

			response.end(trainCache.get(identifier));

			return;
		}

		const train = chain.trains.find(train => train.identifier == identifier);
		const thumbnails: Image[] = [];

		const canvas = new Canvas(height, height);
		const context = canvas.getContext('2d');

		for (let unit of train.units) {
			const capture = await unit.railcar.captures
				.includeTree({ thumbnail: true })
				.where(capture => capture.direction == unit.direction)
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

		canvas.width = thumbnails.reduce((sum, thumbnail) => sum + thumbnail.width, 0);

		let x = 0;

		for (let railcar of thumbnails) {
			context.drawImage(railcar, x, 0);
			x += railcar.width;
		}

		response.set({
			'content-type': 'image/jpeg',
			'cache-control': 'public, max-age=31536000, immutable',
			'etag': identifier
		});

		const buffer = await canvas.toBuffer('jpg');
		trainCache.set(identifier, buffer);

		response.end(buffer);
	});

	server.app.get('/capture/train/:identifier/:direction', (request, response) => {
		const invert = request.params.direction == RailcarDirection.reverse;
		const train = chain.trains.find(train => train.identifier == request.params.identifier);
		const unit = train.units.at(invert ? -1 : 0);

		response.redirect(`/capture/railcar/${unit.railcar.id}/${invert ? reverse(unit.direction) : unit.direction}`);
	});
}
