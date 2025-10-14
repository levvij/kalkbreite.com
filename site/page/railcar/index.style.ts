import { alignContent, alignItems, alignSelf, aspectRatio, attribute, backgroundColor, borderLeft, borderRight, ch, child, color, cursor, display, Dvi, em, filter, firstOfType, flexBasis, flexGrow, flexShrink, flexWrap, fontFamily, fontSize, fontWeight, gap, height, hex, hover, imageRendering, invert, justifyContent, lineHeight, marginBottom, marginInline, marginLeft, marginRight, marginTop, maxHeight, maxWidth, min, not, objectFit, objectPosition, opacity, overflowInline, overflowX, padding, paddingBlock, paddingBottom, paddingInline, paddingLeft, paddingTop, percentage, position, px, ratio, rem, rotate, textAlign, textDecorationLine, transform, turn, vh, whiteSpace, width } from "@acryps/style";
import { boxed, maximumBoxedWidth } from "../shared/boxed";
import { captureAspectRatio, captureBackgroundColor, knockoutColor, knockoutContrastColor, pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor, primaryContrastColor, runningNumberFont, tagFont } from "../index.style";
import { collection, collectionItem } from "../shared/collection";
import { monospacedFont, trainIdentifierFont } from "../assets/font";
import { storageContainerTagStyle } from "../shared/storage-container-tag/index.style";
import { slideshowStyle } from "../shared/slideshow/index.style";
import { graffitiCollectionStyle } from "../shared/graffiti-collection/index.style";
import { endDivider, startDivider } from "../shared/divider";
import { clickable } from "../shared/interaction";
import { detailSectionStyle } from "../shared/detail-section/index.style";
import { buttonGroupStyle, buttonStyle } from "../shared/button";
import { registerGraffitiStyle } from "./register-graffiti/index.style";
import { anchorStyle } from "./anchor/index.style";
import { AtRule } from "@acryps/style/.built/at-rule";
import { maintenanceStyle } from "./maintenance/index.style";

const timeDayLength = rem(6);

export const railcarStyle = () => child('ui-railcar')(
	display('block'),

	child('ui-header')(
		boxed(),

		padding(pageSpacing),

		child('ui-name') (
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(2))
		),

		child('ui-identifiers') (
			display('flex'),
			gap(pageGutter),
			alignItems('center'),

			lineHeight(1),
			fontSize(rem(1.5)),

			child('ui-running-number') (
				flexGrow(1),

				fontFamily(runningNumberFont)
			),

			child('ui-tag') (
				fontFamily(tagFont)
			),

			child('img') (
				height(em(1).subtract(rem(0.4))),
				padding(rem(0.2)),

				backgroundColor(hex('fff')),
				imageRendering('pixelated')
			)
		)
	),

	child('ui-capture') (
		display('flex'),
		justifyContent('center'),

		backgroundColor(captureBackgroundColor),

		child('ui-container') (
			display('flex'),
			justifyContent('center'),
			alignItems('center'),
			width(percentage(100)),
			maxWidth(maximumBoxedWidth),
			maxHeight(vh(40)),

			child('img') (
				maxWidth(percentage(100)),
				height('auto'),
				maxHeight(vh(40)),

				objectFit('contain'),
				objectPosition('left')
			)
		)
	),

	anchorStyle(),
	registerGraffitiStyle(),
	maintenanceStyle(),

	child('ui-toolbar') (
		boxed(),

		display('flex'),
		justifyContent('space-between'),

		position('relative'),

		marginTop(pageGutter.invert()),
		marginBottom(pageGutter),
		paddingInline(pageSpacing),

		child('ui-group') (
			display('flex'),
			gap(pageGutter),

			child('ui-tool') (
				display('flex'),
				alignContent('center'),
				gap(pageGutter),

				padding(pageGutter),

				backgroundColor(pageColor),
				clickable(),

				hover() (
					filter(invert(1))
				),

				attribute('ui-active') (
					filter(invert(1))
				),

				attribute('ui-side', 'tail') (
					transform(rotate(turn(0.5)))
				),

				child('svg') (
					height(rem(1.5)),
					width(rem(2))
				),

				child('ui-icon') (
					fontSize(rem(1.5))
				),

				child('ui-train') (
					trainIdentifierFont
				)
			)
		)
	),

	child('ui-detail') (
		boxed(),
		padding(pageSpacing),

		child('ui-note') (
			display('block'),
			marginBottom(pageSpacing),
		),

		child('ui-actions') (
			buttonGroupStyle(),
			marginBottom(pageSpacing),

			child('ui-action') (
				buttonStyle()
			)
		),

		detailSectionStyle(
			endDivider(),

			child('ui-model') (
				clickable(),

				child('ui-name') (
					display('block'),
					marginBottom(rem(0.5)),

					fontSize(rem(2)),
					lineHeight(1)
				)
			),

			child('ui-miniature-manufacturer') (
				clickable(),

				child('img') (
					height(rem(1.5)),
					maxWidth(percentage(50)),
					marginBottom(rem(0.5)),

					objectFit('contain')
				),

				child('ui-name') (
					display('block')
				)
			),
		),

		graffitiCollectionStyle(
			endDivider()
		),

		storageContainerTagStyle(),

		child('ui-timeline') (
			display('block'),
			marginTop(pageSpacing),

			child('ui-date') (
				display('block'),
				width(timeDayLength.add(pageGutter)),

				borderRight(px(2), 'solid', 'currentColor'),
				monospacedFont,
				fontSize(rem(0.8)),

				not([firstOfType()]) (
					paddingTop(pageGutter)
				)
			),

			child('ui-item') (
				display('flex'),

				child('ui-time') (
					flexShrink(0),
					width(timeDayLength),
					paddingBlock(pageGutter.divide(2)),

					monospacedFont,
					whiteSpace('nowrap'),
					fontSize(rem(0.8)),
					textAlign('right')
				),

				child('ui-content') (
					marginLeft(pageGutter),
					paddingBlock(pageGutter.divide(2)),
					paddingLeft(pageGutter),

					borderLeft(px(2), 'solid', 'currentColor'),

					child('ui-capture') (
						clickable(),

						child('ui-name') (
							display('block'),
							marginBottom(rem(0.25))
						),

						child('img') (
							height(rem(2))
						)
					),

					child('ui-maintenance') (
						clickable(),

						child('ui-name') (
							display('inline-block'),
							paddingInline(ch(0.5)),

							color(primaryContrastColor),
							backgroundColor(primaryColor)
						)
					),

					child('ui-graffiti') (
						clickable(),

						child('ui-name') (
							display('block'),
							marginBottom(rem(0.25))
						),

						child('img') (
							height(rem(2))
						)
					)
				)
			)
		)
	)
)
