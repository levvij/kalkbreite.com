import { alignItems, alignSelf, aspectRatio, backgroundColor, child, color, cursor, display, Dvi, em, filter, flexBasis, flexGrow, flexShrink, flexWrap, fontFamily, fontSize, fontWeight, gap, height, hex, imageRendering, invert, justifyContent, lineHeight, marginBottom, marginInline, marginRight, maxWidth, min, objectFit, padding, paddingBlock, paddingBottom, paddingInline, percentage, ratio, rem, textAlign, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { captureAspectRatio, captureBackgroundColor, knockoutColor, knockoutContrastColor, pageGutter, pageSpacing, runningNumberFont, tagFont } from "../index.style";
import { collection, collectionItem } from "../shared/collection";
import { monospacedFont } from "../assets/font";
import { storageContainerTagStyle } from "../shared/storage-container-tag/index.style";
import { slideshowStyle } from "../shared/slideshow/index.style";
import { graffitiCollectionStyle } from "../shared/graffiti-collection/index.style";
import { endDivider } from "../shared/divider";
import { clickable } from "../shared/interaction";

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

	slideshowStyle(),

	child('ui-detail',
		boxed(),
		padding(pageSpacing),

		child('ui-note',
			display('block'),
			marginBottom(pageGutter),
		),

		child('ui-section',
			display('flex'),
			alignItems('flex-start'),
			flexWrap('wrap'),
			gap(pageSpacing),
			endDivider(),

			child('ui-model',
				display('block'),
				width(min(percentage(100), rem(20))),

				clickable(),

				child('ui-name',
					display('block'),
					marginBottom(rem(0.5)),

					fontSize(rem(2)),
					lineHeight(1)
				)
			),

			child('ui-miniature-manufacturer',
				display('block'),
				width(min(percentage(100), rem(20))),

				clickable(),

				child('img',
					height(rem(1.5)),
					maxWidth(percentage(50)),
					marginBottom(rem(0.5)),

					objectFit('contain')
				),

				child('ui-name',
					display('block')
				)
			),

			child('ui-metrics',
				flexGrow(1),
				collection(rem(20)),

				child('ui-metric',
					collectionItem(),

					display('flex'),
					justifyContent('space-between'),
					alignItems('center'),

					child('ui-name',
						display('flex'),
						alignItems('center'),
						gap(rem(0.5))
					),

					child('ui-value',
						monospacedFont
					)
				),

				child('ui-stakeholder',
					collectionItem(),

					display('flex'),
					justifyContent('space-between'),
					alignItems('center'),

					child('ui-name',
						display('flex'),
						alignItems('center'),
						gap(rem(0.5))
					),

					child('ui-company',
						display('flex'),
						alignItems('center'),

						clickable(),

						child('img',
							height(rem(1)),
							maxWidth(rem(6)),
							marginRight(rem(0.75)),

							objectFit('contain')
						)
					)
				),
			)
		),



		storageContainerTagStyle(),

		graffitiCollectionStyle(
			endDivider()
		)
	)
)
