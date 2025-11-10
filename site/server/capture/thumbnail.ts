import { Canvas, loadImage } from "skia-canvas";
import { Capture } from "../managed/database";
import { anchorShift } from "../../shared/anchor-shift";

export const thumbnailHeight = 500;

export const updateThumbnail = async (source: Capture) => {
	if (!source.data) {
		return;
	}

	const image = await loadImage(source.data);

	const height = thumbnailHeight;
	const width = height / image.height * image.width;

	const canvas = new Canvas(width, height);
	const context = canvas.getContext('2d');
	context.drawImage(image, 0, 0, width, height);

	source.thumbnail = await canvas.toBuffer('jpeg');

	await source.update();
};
