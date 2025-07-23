import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { GraffitiCaptureViewModel, GraffitiViewModel } from "./graffiti";
import { CaptureViewModel } from "../capture/capture";
import { Canvas, loadImage } from "skia-canvas";
import { cropGraffiti } from "../../shared/crop-graffiti";

export class GraffitiService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getGraffiti(id: string) {
		return new GraffitiViewModel(
			await this.database.graffiti.find(id)
		);
	}

	async getSourceCaptures(id: string) {
		const graffiti = await this.database.graffiti.find(id);

		return CaptureViewModel.from(
			this.database.capture
				.orderByAscending(capture => capture.captured)
				.where(capture => capture.direction == graffiti.direction)
				.where(capture => capture.railcarId == graffiti.railcarId)
		);
	}

	async assign(graffitiId: string, captureModel: GraffitiCaptureViewModel) {
		const capture = await captureModel.toModel();
		capture.graffitiId = graffitiId;

		await capture.create();

		// render thumbnail
		const source = await capture.capture.fetch();
		const image = await loadImage(source.data);

		const canvas = new Canvas(1, 1);

		// crop image from full resolution
		cropGraffiti(canvas as any, image as any, capture.left, capture.top, capture.width, capture.height);
		const cropped = await loadImage(await canvas.toBuffer('png'));

		canvas.width = 2000;
		canvas.height = canvas.width / cropped.width * cropped.height;

		const context = canvas.getContext('2d');
		context.drawImage(cropped, 0, 0, canvas.width, canvas.height);

		capture.thumbnail = await canvas.toBuffer('jpeg');
		await capture.update();
	}
}
