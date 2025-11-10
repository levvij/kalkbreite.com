import { rem, child, display, padding, marginBottom, fontSize, gap, alignItems, lineHeight, flexGrow, fontFamily, height, em, backgroundColor, hex, imageRendering, justifyContent, width, percentage, maxWidth, maxHeight, vh, objectFit, objectPosition, position, marginTop, paddingInline, alignContent, hover, filter, invert, attribute, transform, rotate, turn, borderRight, px, firstOfType, paddingTop, flexShrink, paddingBlock, whiteSpace, textAlign, marginLeft, paddingLeft, borderLeft, ch, color, scaleX, minHeight, firstChild, not, border, marginInline } from "@acryps/style";
import { trainIdentifierFont, monospacedFont } from "../../assets/font";
import { pageSpacing, pageGutter, runningNumberFont, tagFont, captureBackgroundColor, pageColor, primaryContrastColor, primaryColor, pageContrastColor } from "../../index.style";
import { boxed, maximumBoxedWidth } from "../../shared/boxed";
import { activateButtonStyle, buttonGroupStyle, buttonStyle, mergedButtonGroup } from "../../shared/button";
import { detailSectionStyle } from "../../shared/detail-section/index.style";
import { endDivider } from "../../shared/divider";
import { graffitiCollectionStyle } from "../../shared/graffiti-collection/index.style";
import { clickable } from "../../shared/interaction";
import { storageContainerTagStyle } from "../../shared/storage-container-tag/index.style";
import { anchorStyle } from "./anchor/index.style";
import { maintenanceStyle } from "./maintenance/index.style";
import { registerGraffitiStyle } from "./register-graffiti/index.style";
import { trainLabelStyle } from "../../shared/train-label/index.style";
import { couplerStyle } from "./coupler/index.style";
import { comissionRailcarStyle } from "./comission/index.style";

const timeDayLength = rem(6);

export const railcarStyle = () => child('ui-railcar')(
	display('block'),

	couplerStyle(),
	comissionRailcarStyle(),

	child('ui-header') (
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
			marginBottom(pageGutter),

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
		),

		child('ui-train') (
			display('flex'),
			justifyContent('flex-start'),
			gap(pageGutter),

			trainLabelStyle(),

			child('ui-identifier') (
				trainIdentifierFont
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
			minHeight(rem(10)),
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
			mergedButtonGroup(),

			child('ui-tool') (
				display('flex'),
				alignContent('center'),
				gap(pageGutter),

				buttonStyle(),

				attribute('ui-active') (
					activateButtonStyle()
				),

				attribute('ui-side', 'tail') (
					child('svg') (
						transform(rotate(turn(0.5))),
					),

					attribute('ui-flippable') (
						child('svg') (
							transform(scaleX(-1))
						)
					)
				),

				child('svg') (
					height(rem(1.25)),
					width(rem(2)),

					filter(invert(1))
				),

				child('ui-icon') (
					fontSize(rem(1.25))
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
