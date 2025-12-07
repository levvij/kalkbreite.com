import { alignItems, backgroundColor, border, borderBottomLeftRadius, borderBottomRightRadius, borderRadius, borderRight, borderTopLeftRadius, borderTopRightRadius, boxShadow, child, color, display, flexGrow, focus, fontFamily, fontSize, justifyContent, marginInline, maxWidth, outline, padding, px, rem } from "@acryps/style";
import { primaryColor, radius, primaryOutlineColor, primaryContrastColor } from "../../index.style";
import { inputSpacingBlock, inputSpacingInline } from "../field.style";
import { clickable } from "../interaction";

export const searchStyle = () => child('ui-search') (
	display('flex'),
	maxWidth(rem(25)),
	marginInline('auto'),

	child('input') (
		flexGrow(1),

		padding(inputSpacingBlock, inputSpacingInline),

		fontFamily('inherit'),
		fontSize(rem(1)),
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

		padding(rem(0.5).add(px(2)), rem(0.75)),

		color(primaryContrastColor),
		backgroundColor(primaryColor),
		fontSize(rem(1.25)),

		borderTopRightRadius(radius),
		borderBottomRightRadius(radius),

		clickable()
	)
);
