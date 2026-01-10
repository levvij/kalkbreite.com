import { Canvas, loadImage } from "skia-canvas";
import { ManagedServer } from "../managed/server";
import { CaptureSession } from "../managed/database";

export const registerCaptureSessionInterface = (server: ManagedServer, database: DbContext) => {
	server.app.post('/capture', async (request, response) => {
		const session = new CaptureSession();
		session.captured = new Date();
		session.mimeType = 'image/png';

		await session.create();

		const chunks = [];
		request.on('data', chunk => chunks.push(chunk));

		request.on('end', async () => {
			session.data = Buffer.concat(chunks);
			await session.update();

			response.sendStatus(200).end();

			// render thumbnail
			const image = await loadImage(session.data);
			const height = 200;

			const canvas = new Canvas(Math.floor(height / image.height * image.width), height);

			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0, canvas.width, canvas.height);

			session.thumbnail = await canvas.toBuffer('jpg');
			await session.update();
		});
	});
};
