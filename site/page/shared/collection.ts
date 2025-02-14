import { Length, Variable, display, fr, gap, gridTemplateColumns, maxWidth, minMax, repeat } from "@acryps/style";
import { pageGutter } from "../index.style";

const sizeVariable = new Variable<Length>('item-size');

export const collection = (size: Length, gutter: Length = pageGutter) => [
	sizeVariable.provide(size),

	display('grid'),
	gridTemplateColumns(repeat('auto-fill', minMax(sizeVariable, fr(1)))),
	gap(gutter)
];

export const collectionItem = () => [
	maxWidth(sizeVariable.multiply(2))
];
