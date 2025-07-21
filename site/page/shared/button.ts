import { alignItems, alignSelf, backgroundColor, border, borderRadius, boxShadow, color, cursor, display, flexWrap, gap, lineHeight, marginBlock, marginBottom, padding, px, rem, style } from "@acryps/style";
import { pageGutter, primaryColor, primaryContrastColor, primaryOutlineColor, radius } from "../index.style";

export const buttonDepth = px(4);

export const buttonStyle = () => [
	display('flex'),
	alignItems('center'),
	gap(pageGutter.multiply(0.75)),

	padding(pageGutter),

	color(primaryContrastColor),
	backgroundColor(primaryColor),
	borderRadius(radius),
	boxShadow(primaryOutlineColor, 0, buttonDepth, 0, 0),
	marginBottom(buttonDepth),

	lineHeight(1),
	cursor('pointer'),

	style(':hover',
		boxShadow(primaryOutlineColor, 0, buttonDepth.divide(2), 0, 0),
		marginBlock(buttonDepth.divide(2)),
	)
];

export const buttonGroupStyle = () => [
	display('flex'),
	flexWrap('wrap'),
	gap(pageGutter)
];
