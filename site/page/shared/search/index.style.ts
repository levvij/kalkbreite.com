import { alignItems, backgroundColor, border, borderBottomLeftRadius, borderBottomRightRadius, borderRadius, borderRight, borderTopLeftRadius, borderTopRightRadius, boxShadow, child, color, display, em, flexGrow, focus, fontFamily, fontSize, justifyContent, marginInline, maxWidth, outline, padding, px, rem, StyleSelectorBody } from "@acryps/style";
import { primaryColor, radius, primaryOutlineColor, primaryContrastColor } from "../../index.style";
import { inputSpacingBlock, inputSpacingInline } from "../field.style";
import { clickable } from "../interaction";

export const searchStyle = (...extra: StyleSelectorBody[]) => child('ui-search') (
	display('flex'),
	marginInline('auto'),

	borderRadius(radius),

	extra,

	child('input') (
		flexGrow(1),

		padding(inputSpacingBlock, inputSpacingInline),

		fontFamily('inherit'),
		fontSize(em(1)),
		border(px(2), 'solid', primaryColor),
		borderRight('none'),
		borderRadius(0),
		outline(0, 'none', 'transparent'),

		borderTopLeftRadius(radius),
		borderBottomLeftRadius(radius),

		focus() (
			boxShadow(primaryOutlineColor, 0, 0, 0, px(1), 'inset')
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
