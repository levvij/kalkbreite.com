import { alignItems, appearance, attribute, backgroundColor, border, borderBottomLeftRadius, borderBottomRightRadius, borderRadius, borderRight, borderTopLeftRadius, borderTopRightRadius, boxShadow, child, color, ColorValue, display, em, flexGrow, focus, fontFamily, fontSize, hex, insetBlock, justifyContent, left, marginInline, maxWidth, outline, padding, pointerEvents, position, px, rem, right, StyleSelectorBody, Variable } from "@acryps/style";
import { primaryColor, radius, primaryOutlineColor, primaryContrastColor, pageColor, pageContrastColor } from "../../index.style";
import { inputSpacingBlock, inputSpacingInline } from "../field.style";
import { clickable } from "../interaction";

export const searchStyle = (...extra: StyleSelectorBody[]) => child('ui-search') (
	display('flex'),
	marginInline('auto'),

	borderRadius(radius),

	extra,

	child('ui-field') (
		display('flex'),
		flexGrow(1),

		position('relative'),

		child('input') (
			flexGrow(1),

			padding(inputSpacingBlock, inputSpacingInline),

			fontFamily('inherit'),
			fontSize(em(1)),
			border(px(2), 'solid', primaryColor),
			borderRight('none'),
			borderRadius(0),
			outline(0, 'none', 'transparent'),

			color(pageContrastColor),
			backgroundColor(pageColor),

			borderTopLeftRadius(radius),
			borderBottomLeftRadius(radius),

			focus() (
				boxShadow(primaryOutlineColor, 0, 0, 0, px(1), 'inset')
			)
		),

		child('ui-shortcut') (
			position('absolute'),
			right(inputSpacingInline),
			insetBlock(px(3)),

			display('flex'),
			alignItems('center'),

			color(primaryColor),
			backgroundColor(pageColor),

			pointerEvents('none')
		)
	),

	child('ui-action') (
		display('flex'),
		alignItems('center'),
		justifyContent('center'),

		padding(em(0.5).add(px(2)), em(0.75)),

		color(primaryContrastColor),
		backgroundColor(primaryColor),
		fontSize(em(1.25)),

		borderTopRightRadius(radius),
		borderBottomRightRadius(radius),

		clickable()
	)
);
