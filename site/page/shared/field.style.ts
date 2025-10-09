import { resize, paddingBlock, rem, paddingInline, fontFamily, fontSize, color, backgroundColor, border, borderRadius, outline, child, display, flexDirection, marginBottom, StyleSelectorBody, height, padding, style, alignItems, marginLeft, paddingLeft, margin, width, position, left, top, lineHeight, paddingTop, px, content, justifyContent, appearance, has, attribute, checked, after } from "@acryps/style";
import { pageColor, pageContrastColor, primaryColor, radius } from "../index.style";

export const inputTextColor = pageContrastColor;
export const inputBackgroundColor = pageColor;

export const inputSpacingInline = rem(0.75);
export const inputSpacingBlock = rem(0.5);

export const inputStyle = () => [
	resize('none'),

	paddingBlock(inputSpacingBlock),
	paddingInline(inputSpacingInline),

	fontFamily('inherit'),
	fontSize(rem(1)),
	color(inputTextColor),
	backgroundColor(inputBackgroundColor),
	border(px(1), 'solid', primaryColor),
	borderRadius(radius),
	outline(0, 'none', 'transparent')
];

const checkboxSize = rem(1.5);
const checkboxBorderSize = px(2);

const labelBottomSpacing = rem(0.375);

export const fieldStyle = (...extras: StyleSelectorBody[]) => child('ui-field') (
	display('flex'),
	flexDirection('column'),
	marginBottom(rem(1)),

	has(child('input'), attribute('type', 'checkbox')) (
		position('relative'),

		paddingLeft(checkboxSize.add(inputSpacingInline)),
		paddingTop(checkboxSize.subtract(rem(1)).subtract(labelBottomSpacing).divide(2))
	),

	child('input') (
		inputStyle(),

		attribute('type', 'color') (
			height(rem(2)),
			padding(0)
		),

		attribute('type', 'checkbox') (
			appearance('none'),

			position('absolute'),
			top(0),
			left(0),

			margin(0),
			padding(0),
			width(checkboxSize.subtract(checkboxBorderSize.multiply(2))),
			height(checkboxSize.subtract(checkboxBorderSize.multiply(2))),

			backgroundColor(inputBackgroundColor),
			border(checkboxBorderSize, 'solid', inputBackgroundColor),

			checked(after()) (
				content('X'),
				color(inputTextColor),

				display('flex'),
				alignItems('center'),
				justifyContent('center'),

				position('absolute'),
				top(checkboxBorderSize.invert()),
				left(checkboxBorderSize.invert()),

				height(checkboxSize.subtract(checkboxBorderSize.multiply(2))),
				width(checkboxSize.subtract(checkboxBorderSize.multiply(2)))
			)
		)
	),

	child('textarea') (
		inputStyle()
	),

	child('select') (
		inputStyle()
	),

	child('label') (
		display('block'),
		marginBottom(labelBottomSpacing),

		lineHeight(1)
	),

	child('ui-hint') (
		display('block'),
		marginBottom(rem(0.75)),

		fontSize(rem(0.75))
	),

	extras
);
