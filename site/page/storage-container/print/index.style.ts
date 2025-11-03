import { alignItems, backgroundColor, borderInline, child, color, display, filter, flexGrow, flexShrink, fontSize, gap, height, hex, imageRendering, lineHeight, margin, marginBottom, mm, padding, paddingInline, paddingTop, percentage, root, width } from "@acryps/style";
import { monospacedFont } from "../../assets/font";

const itemSpacing = mm(6);
const labelPadding = mm(4);

export const printStyle = () => root() (
	child('body') (
		color(hex('000')),
		backgroundColor(hex('fff')),

		paddingInline(mm(10)),
		paddingTop(mm(19)),

		child('ui-tag-sheet') (
			display('block'),

			child('ui-storage-container-tag') (
				display('flex'),
				alignItems('center'),
				gap(itemSpacing),

				width(mm(190).subtract(labelPadding.multiply(2))),
				height(mm(18).subtract(labelPadding.multiply(2))),
				padding(labelPadding),
				marginBottom(mm(6)),

				lineHeight(1),

				child('img') (
					flexShrink(0),
					height(percentage(100)),

					imageRendering('pixelated')
				),

				child('ui-name') (
					flexGrow(1),

					fontSize(mm(6))
				),

				child('ui-tag') (
					monospacedFont
				)
			)
		)
	)
);
