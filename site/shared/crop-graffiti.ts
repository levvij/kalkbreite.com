export const cropGraffiti = (canvas: Partial<HTMLCanvasElement>, image: HTMLImageElement, left: number, top: number, width: number, height: number) => {
	const skew = 0.375;
	const scale = 1.2;

	const sourceWidth = image.naturalWidth ?? image.width;
	const sourceHeight = image.naturalHeight ?? image.height;

	const context = canvas.getContext!('2d')!;
	context.reset();

	const croppedWidth = canvas.width = sourceWidth * width * scale;
	const croppedHeight = canvas.height = sourceHeight * height;

	context.translate(-skew / 2 * croppedHeight, 0);
	context.transform(1, 0, skew, 1, 0, 0);
	context.scale(scale, 1);

	context.drawImage(image, -sourceWidth * left, -sourceHeight * top);

	return context;
}
