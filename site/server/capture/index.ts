import { Service } from "vlserver";
import { Capture, DbContext, RailcarDirection } from "../managed/database";
import { CaptureSessionViewModel } from "./capture";
import { Canvas, loadImage } from "skia-canvas";
import { lengthMultiplier } from "../../shared/anchor-shift";

export class CaptureService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	listFreshCaptures() {
		return CaptureSessionViewModel.from(
			this.database.captureSession
				.where(session => session.corrupted == null)
				.where(session => session.reviewed == null)
				.orderByAscending(session => session.captured)
		);
	}

	listCaptures() {
		return CaptureSessionViewModel.from(
			this.database.captureSession
				.orderByDescending(session => session.captured)
		);
	}

	async assign(sessionId: string, offset: number, railcarId: string, side: RailcarDirection) {
		console.log('assign capture', sessionId, offset, railcarId, side);

		const session = await this.database.captureSession.find(sessionId);
		const railcar = await this.database.railcar.find(railcarId);
		const model = await railcar.model.fetch();

		const sessionCapture = await loadImage(session.data);

		const margin = sessionCapture.height / 2;
		const length = model.lengthIncludingBuffers / lengthMultiplier * sessionCapture.height + margin * 2;

		const canvas = new Canvas(length, sessionCapture.height);

		const context = canvas.getContext('2d');
		context.drawImage(sessionCapture, -offset * sessionCapture.width + margin, 0);

		console.log('create capture');
		const capture = new Capture();
		capture.session = session;
		capture.sessionBufferOffset = offset;

		// add margin offset
		capture.bufferAnchorOffset = 1 / length * margin;

		capture.railcar = railcar;
		capture.captured = new Date();
		capture.corrupted = false;
		capture.direction = side;

		await capture.create();

		// render frame
		console.log('render frame');
		capture.data = await canvas.toBuffer('png');
		capture.mimeType = 'image/png';

		await capture.update();

		// render thumbnail
		console.log('render thumbnail');
		canvas.height = 500;
		canvas.width = Math.floor(length / sessionCapture.height * canvas.height);

		context.drawImage(await loadImage(capture.data), 0, 0, canvas.width, canvas.height);
		capture.thumbnail = await canvas.toBuffer('jpg');

		await capture.update();
	}
}
