import { alignItems, alignSelf, backgroundColor, border, borderBottomLeftRadius, borderBottomRightRadius, borderRadius, borderRight, borderTopLeftRadius, borderTopRightRadius, boxShadow, child, color, cursor, descendant, display, firstChild, flexWrap, gap, hover, justifyContent, lastChild, lineHeight, marginBlock, marginBottom, padding, px, rem, style, textAlign } from "@acryps/style";
import { knockoutColor, knockoutContrastColor, knockoutOutlineColor, pageGutter, primaryColor, primaryContrastColor, primaryOutlineColor, radius } from "../index.style";
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

export const activateButtonStyle = () => [
	color(knockoutContrastColor),
	backgroundColor(knockoutColor),

	boxShadow(knockoutOutlineColor, 0, buttonDepth, 0, 0),

	hover() (
		boxShadow(knockoutOutlineColor, 0, buttonDepth.divide(2), 0, 0),
	)
];

export const buttonGroupStyle = () => [
	display('flex'),
	flexWrap('wrap'),
	gap(pageGutter)
];

export const mergedButtonGroup = () => [
	display('flex'),

	child('*') (
		borderRadius(0).important(),
		borderRight(px(1), 'solid', primaryOutlineColor),

		firstChild() (
			borderTopLeftRadius(radius).important(),
			borderBottomLeftRadius(radius).important()
		),

		lastChild() (
			borderTopRightRadius(radius).important(),
			borderBottomRightRadius(radius).important(),

			borderRight('none')
		)
	)
];
