import { backgroundColor, backgroundImage, border, borderInline, borderRadius, boxShadow, child, color, colorStop, cursor, display, filter, flexGrow, flexShrink, fontSize, gap, hex, invert, linearGradient, lineHeight, marginInline, mm, padding, paddingBlock, paddingInline, percentage, px, rem, turn } from "@acryps/style";
import { knockoutColor, knockoutContrastColor, pageGutter, storageTagTextColor, strorageTagBackground } from "../../index.style";
import { monospacedFont } from "../../assets/font";

const spacing = rem(1.5);

export const storageContainerTagStyle = (...extras) => child('ui-storage-container-tag') (
	display('flex'),
	gap(spacing),
	paddingBlock(rem(1)),
	paddingInline(rem(1.5)),

	color(hex('000c')),
	backgroundImage(
		linearGradient(turn(0.3),
			colorStop(percentage(0), hex('eee6')),
			colorStop(percentage(20), hex('ccc6')),
			colorStop(percentage(60), hex('fff6')),
			colorStop(percentage(100), hex('eee6'))
		),
		linearGradient(turn(0.6),
			colorStop(percentage(0), hex('ddd6')),
			colorStop(percentage(20), hex('ccc6')),
			colorStop(percentage(60), hex('fff6')),
			colorStop(percentage(100), hex('ddd6'))
		)
	),
	boxShadow(hex('fff6'), 0, 0, px(5), 0, 'inset'),

	border(px(1), 'solid', hex('0002')),
	borderRadius(rem(0.25)),

	fontSize(rem(2)),
	lineHeight(1),

	cursor('pointer'),

	extras,

	child('img') (
		flexShrink(0)
	),

	child('ui-name') (
		flexGrow(1),
		paddingInline(spacing),

		borderInline(px(4), 'solid', 'currentColor')
	),

	child('ui-tag') (
		monospacedFont
	)
)
