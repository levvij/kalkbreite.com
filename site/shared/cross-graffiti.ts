type Shape = {
	top: number;
	left: number;
	width: number;
	height: number;
}

export const crossesGraffiti = (base: Shape, peer: Shape, threshold = 0.2) => {
	const rightA = base.left + base.width;
	const bottomA = base.top + base.height;
	const rightB = peer.left + peer.width;
	const bottomB = peer.top + peer.height;

	if (base.width <= 0 || base.height <= 0) {
		return false;
	}

	const overlapLeft = Math.max(base.left, peer.left);
	const overlapTop = Math.max(base.top, peer.top);
	const overlapRight = Math.min(rightA, rightB);
	const overlapBottom = Math.min(bottomA, bottomB);

	const overlapWidth = Math.max(0, overlapRight - overlapLeft);
	const overlapHeight = Math.max(0, overlapBottom - overlapTop);

	const overlapArea = overlapWidth * overlapHeight;
	const areaA = base.width * base.height;

	if (overlapArea <= 0) {
		return false;
	}

	return (overlapArea / areaA) > threshold;
}
