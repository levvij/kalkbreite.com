import { alignContent, alignItems, alignSelf, aspectRatio, attribute, backgroundColor, child, color, cursor, display, Dvi, em, filter, flexBasis, flexGrow, flexShrink, flexWrap, fontFamily, fontSize, fontWeight, gap, height, hex, hover, imageRendering, invert, justifyContent, lineHeight, marginBottom, marginInline, marginRight, marginTop, maxWidth, min, objectFit, opacity, padding, paddingBlock, paddingBottom, paddingInline, percentage, position, ratio, rem, rotate, textAlign, transform, turn, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { captureAspectRatio, captureBackgroundColor, knockoutColor, knockoutContrastColor, pageColor, pageContrastColor, pageGutter, pageSpacing, runningNumberFont, tagFont } from "../index.style";
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

export const railcarStyle = () => child('ui-railcar')(
	display('block'),

	child('ui-header')(
		boxed(),

		padding(pageSpacing),

		child('ui-name')(
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(2))
		),

		child('ui-identifiers')(
			display('flex'),
			gap(pageGutter),
			alignItems('center'),

			lineHeight(1),
			fontSize(rem(1.5)),

			child('ui-running-number')(
				flexGrow(1),

				fontFamily(runningNumberFont)
			),

			child('ui-tag')(
				fontFamily(tagFont)
			),

			child('img')(
				height(em(1).subtract(rem(0.4))),
				padding(rem(0.2)),

				backgroundColor(hex('fff')),
				imageRendering('pixelated')
			)
		)
	),

	slideshowStyle(),

	anchorStyle(),
	registerGraffitiStyle(),
	maintenanceStyle(),

	child('ui-couplers')(
		boxed(),

		display('flex'),
		justifyContent('space-between'),

		position('relative'),

		marginTop(pageGutter.invert()),
		marginBottom(pageGutter),
		paddingInline(pageSpacing),

		child('ui-side')(
			display('flex'),
			gap(pageGutter),

			child('ui-link')(
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

			startDivider(),

			child('img') (
				aspectRatio(captureAspectRatio),
				width(percentage(100)),

				objectFit('contain')
			),

			child('ui-captures') (
				collection(rem(6)),

				child('ui-capture') (
					collectionItem(),

					opacity(0.5),

					attribute('ui-active') (
						opacity(1)
					),

					child('img') (
						aspectRatio(captureAspectRatio),
						width(percentage(100)),
					),

					child('ui-date') (
						display('block')
					),

					child('ui-actions') (
						display('block'),

						child('ui-action') (
							buttonStyle()
						)
					)
				)
			)
		)
	)
)
