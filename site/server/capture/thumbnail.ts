import { Canvas, loadImage } from "skia-canvas";
import { Capture } from "../managed/database";
import { anchorShift } from "../../shared/anchor-shift";

export const updateThumbnail = async (source: Capture) => {
	if (!source.data) {
		return;
	}

	const image = await loadImage(source.data);

	const width = 2000;
	const height = width / image.width * image.height;

	const canvas = new Canvas(width, height);
	const context = canvas.getContext('2d');
	context.drawImage(image, 0, 0, width, height);

	// shift image
	if (source.bufferAnchorOffset) {
		anchorShift(canvas as any, await loadImage(await canvas.toBuffer('png')) as any, source.bufferAnchorOffset);
	}

	source.thumbnail = await canvas.toBuffer('jpeg');

	await source.update();
};
