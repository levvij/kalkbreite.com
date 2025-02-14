import { alignItems, aspectRatio, backgroundColor, child, color, display, Dvi, em, filter, flexGrow, fontFamily, fontSize, gap, height, hex, imageRendering, invert, justifyContent, lineHeight, marginBottom, marginRight, objectFit, padding, paddingBlock, paddingInline, percentage, ratio, rem, textAlign, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { captureAspectRatio, captureBackgroundColor, knockoutColor, knockoutContrastColor, pageGutter, pageSpacing, runningNumberFont, tagFont } from "../index.style";
import { collection, collectionItem } from "../shared/collection";

export const railcarStyle = () => child('ui-railcar',
	display('block'),

	child('ui-header',
		boxed(),

		paddingInline(pageSpacing),
		marginBottom(pageGutter),

		child('ui-name',
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(2))
		),

		child('ui-identifiers',
			display('flex'),
			gap(pageGutter),
			alignItems('center'),

			lineHeight(1),
			fontSize(rem(1.5)),

			child('ui-running-number',
				flexGrow(1),

				fontFamily(runningNumberFont)
			),

			child('ui-tag',
				fontFamily(tagFont)
			),

			child('img',
				height(em(1).subtract(rem(0.4))),
				padding(rem(0.2)),

				backgroundColor(hex('fff')),
				imageRendering('pixelated')
			)
		)
	),

	child('ui-capture',
		display('block'),
		marginBottom(pageGutter),
		paddingInline(pageSpacing),
		paddingBlock(pageGutter),
		fontSize(0),

		backgroundColor(captureBackgroundColor),

		child('ui-image',
			boxed(),

			child('img',
				width(percentage(100)),
				aspectRatio(captureAspectRatio),

				objectFit('contain')
			)
		)
	),

	child('ui-detail',
		boxed(),
		paddingInline(pageSpacing),

		child('ui-note',
			display('block'),
			marginBottom(pageGutter),
		),

		child('ui-metrics',
			collection(rem(10)),
			marginBottom(pageGutter),

			child('ui-metric',
				collectionItem(),

				padding(pageGutter),

				color(knockoutContrastColor),
				backgroundColor(knockoutColor),
				textAlign('center'),

				child('ui-icon',
					display('block'),

					fontSize(rem(3))
				),

				child('ui-value',
					display('block'),

					fontSize(rem(2))
				)
			)
		),

		child('ui-stakeholders',
			collection(rem(10)),
			marginBottom(pageGutter),

			child('ui-stakeholder',
				collectionItem(),

				padding(pageGutter),

				color(knockoutContrastColor),
				backgroundColor(knockoutColor),

				child('img',
					width(percentage(100)),
					aspectRatio(ratio(2, 1)),

					objectFit('contain'),
					filter(invert(1))
				)
			)
		)
	)
)
