import { Canvas, loadImage } from "skia-canvas";
import { CaptureFrame, CaptureSession, DbContext } from "../managed/database";
import { ManagedServer } from "../managed/server";

export const registerCaptureSessionInterface = (server: ManagedServer, database: DbContext) => {
	const renderNextThumbnail = async () => {
		const capture = await database.captureFrame
			.where(frame => frame.data != null)
			.first(frame => frame.thumbnail == null);

		if (capture) {
			const image = await loadImage(capture.data);

			const width = 200;
			const height = width / image.width * image.height;

			const canvas = new Canvas(width, height);
			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0, width, height);

			capture.thumbnail = await canvas.toBuffer('jpeg');
			await capture.update();
		}

		setTimeout(() => renderNextThumbnail(), 1000);
	};

	renderNextThumbnail();

	server.app.get('/capture/session/create', async (request, response) => {
		const session = new CaptureSession();
		session.created = new Date();

		await session.create();

		response.end(session.id);
	});

	server.app.post('/capture/session/:id/:x/:y', async (request, response) => {
		const sessionId = request.params.id;
		const x = +request.params.x;
		const y = +request.params.y;

		const capture = new CaptureFrame();
		capture.sessionId = sessionId;
		capture.offsetX = x;
		capture.offsetY = y;
		capture.uploaded = new Date();

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
};
