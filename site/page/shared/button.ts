import { alignItems, alignSelf, backgroundColor, border, borderRadius, boxShadow, color, cursor, display, flexWrap, gap, hover, justifyContent, lineHeight, marginBlock, marginBottom, padding, px, rem, style, textAlign } from "@acryps/style";
import { pageGutter, primaryColor, primaryContrastColor, primaryOutlineColor, radius } from "../index.style";
import { clickable } from "./interaction";

export const buttonDepth = px(4);

export const buttonStyle = () => [
	display('flex'),
	alignItems('center'),
	justifyContent('center'),
	gap(pageGutter.multiply(0.75)),

	padding(pageGutter),

	color(primaryContrastColor),
	backgroundColor(primaryColor),
	borderRadius(radius),
	boxShadow(primaryOutlineColor, 0, buttonDepth, 0, 0),
	marginBottom(buttonDepth),

	lineHeight(1),
	clickable(),

	hover() (
		boxShadow(primaryOutlineColor, 0, buttonDepth.divide(2), 0, 0),
		marginBlock(buttonDepth.divide(2))
	)
];

export const buttonGroupStyle = () => [
	display('flex'),
	flexWrap('wrap'),
	gap(pageGutter)
];
