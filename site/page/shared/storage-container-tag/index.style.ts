import { backgroundColor, borderInline, child, color, cursor, display, filter, flexGrow, flexShrink, fontSize, gap, invert, lineHeight, marginInline, mm, padding, paddingInline, px, rem } from "@acryps/style";
import { knockoutColor, knockoutContrastColor, pageGutter } from "../../index.style";
import { monospacedFont } from "../../assets/font";

const spacing = rem(1.5);

export const storageContainerTagStyle = () => child('ui-storage-container-tag',
	display('flex'),
	gap(spacing),
	padding(pageGutter),

	color(knockoutContrastColor),
	backgroundColor(knockoutColor),

	fontSize(rem(2)),
	lineHeight(1),

	cursor('pointer'),

	child('img',
		flexShrink(0),
		filter(invert(1))
	),

	child('ui-name',
		flexGrow(1),
		paddingInline(spacing),

		borderInline(px(4), 'solid', 'currentColor')
	),

	child('ui-tag',
		monospacedFont
	)
)
