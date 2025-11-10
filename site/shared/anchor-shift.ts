export const anchorShift = (canvas: Partial<HTMLCanvasElement>, image: HTMLImageElement, offset: number, margin = 0.1) => {
	const sourceWidth = image.naturalWidth ?? image.width;
	const sourceHeight = image.naturalHeight ?? image.height;

	canvas.height = sourceHeight;
	canvas.width = sourceWidth - sourceWidth * offset + sourceWidth * margin * 2;

	const context = canvas.getContext!('2d')!;
	context.reset();

	context.drawImage(image, -sourceWidth * offset + sourceWidth * margin, 0);
};

// 1 image height = ~6.6 real life meters
export const lengthMultiplier = 6.585;
