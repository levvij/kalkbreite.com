import { rem, child, display, padding, marginBottom, fontSize, gap, alignItems, lineHeight, flexGrow, fontFamily, height, em, backgroundColor, hex, imageRendering, justifyContent, width, percentage, maxWidth, maxHeight, vh, objectFit, objectPosition, position, marginTop, paddingInline, alignContent, hover, filter, invert, attribute, transform, rotate, turn, borderRight, px, firstOfType, paddingTop, flexShrink, paddingBlock, whiteSpace, textAlign, marginLeft, paddingLeft, borderLeft, ch, color, scaleX, minHeight, firstChild, not, border, marginInline, descendant, empty, Variable, left, insetBlock, Ratio, Percentage, ColorValue, aspectRatio, BorderTopWidthStyleProperty, borderTop, bottom, borderBottom, insetInline, boxShadow, top, paddingBottom, flexDirection, marginBlock, media, minWidth, after, content, inset, borderInline, skew, deg, vw, alignSelf, zIndex, max, overflow } from "@acryps/style";
import { trainIdentifierFont, monospacedFont, cargoLoadIdentifierFont } from "../../assets/font";
import { pageSpacing, pageGutter, runningNumberFont, tagFont, captureBackgroundColor, pageColor, primaryContrastColor, primaryColor, pageContrastColor, cargoFixtureColor, captureRotation } from "../../index.style";
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
import { cargoLength, cargoOffset } from "../../model/index.style";

const timeDayLength = rem(6);

export const bufferAnchorOffset = new Variable<Number>('buffer-anchor-offset');

export const cargoHeight = new Variable<Ratio>('cargo-height');
export const cargoBaseline = new Variable<Percentage>('cargo-baseline');

export const cargoLoadColor = new Variable<ColorValue>('cargo-color');
export const cargoLoadLogoColor = new Variable<ColorValue>('cargo-logo-color');

export const railcarStyle = () => child('ui-railcar')(
	display('block'),
	overflow('hidden'),

	couplerStyle(),
	comissionRailcarStyle(),

	child('ui-header') (
		boxed(),

		display('flex'),
		flexDirection('column'),
		padding(pageSpacing),

		position('relative'),
		zIndex(1),

		child('ui-train') (
			display('flex'),
			justifyContent('flex-start'),
			gap(pageGutter),
			marginBottom(pageGutter),

			trainLabelStyle(),

			child('ui-identifier') (
				trainIdentifierFont
			)
		),

		child('ui-name') (
			width(percentage(65)),

			lineHeight(1.1),
			fontSize(max(vw(8), rem(2))),
		),

		child('ui-running-number') (
			width(percentage(50)),

			lineHeight(1.2),
			fontSize(max(vw(4), rem(1.25))),
			fontFamily(runningNumberFont)
		)
	),

	child('ui-capture') (
		display('flex'),
		justifyContent('center'),
		marginTop(vh(-7.5)),

		backgroundColor(captureBackgroundColor),

		transform(rotate(captureRotation)),

		child('ui-container') (
			display('flex'),
			justifyContent('center'),
			alignItems('center'),
			width(percentage(100)),
			minHeight(rem(10)),
			maxWidth(maximumBoxedWidth),
			maxHeight(vh(40)),

			position('relative'),

			child('img') (
				maxWidth(percentage(100)),
				height('auto'),
				maxHeight(vh(40)),

				objectFit('contain'),
				objectPosition('left')
			),

			child('ui-buffer-anchor') (
				position('absolute'),
				insetBlock(0),
				left(percentage(100).multiply(bufferAnchorOffset)),

				attribute('ui-active') (
					borderRight(px(1), 'dashed', hex('fff4'))
				)
			)
		)
	),

	child('ui-identifier') (
		boxed(),
		paddingInline(pageSpacing),

		display('flex'),
		justifyContent('flex-end'),

		child('ui-tag') (
			padding(vw(1)),
			border(px(2), 'solid', 'currentColor'),

			fontSize(vw(5)),
			lineHeight(1)
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

		marginBlock(pageGutter),
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

		child('ui-cargo') (
			display('block'),
			marginBottom(pageSpacing),

			media(minWidth(px(750))) (
				paddingTop(rem(1).add(px(2)).add(rem(0.5)).add(rem(0.25))), // fixture/slot labels
			),

			child('ui-bay') (
				display('block'),
				width(percentage(100)),
				position('relative'),

				media(maxWidth(px(750))) (
					height(rem(10)),
				),

				media(minWidth(px(750))) (
					aspectRatio(cargoHeight as any),
				),

				child('ui-load') (
					position('absolute'),
					left(cargoOffset),
					width(cargoLength),
					top(0),
					height(percentage(100)),

					after() (
						content(''),

						position('absolute'),
						inset(0),
						top(rem(-0.5)),

						borderInline(px(1), 'dotted', cargoFixtureColor)
					),

					child('ui-fixture') (
						media(minWidth(px(750))) (
							position('absolute'),
							insetInline(0),
							bottom(percentage(100).add(rem(0.5))),
						),

						display('flex'),
						justifyContent('space-between'),
						paddingBottom(rem(0.25)),

						color(cargoFixtureColor),
						borderBottom(px(2), 'solid', cargoFixtureColor),
						lineHeight(1)
					),

					child('ui-load') (
						position('absolute'),
						left(cargoOffset),
						width(cargoLength),

						media(minWidth(px(750))) (
							aspectRatio(cargoHeight as any),
							bottom(cargoBaseline),
						),

						media(maxWidth(px(750))) (
							bottom(pageGutter)
						),

						display('flex'),
						flexDirection('column'),
						alignItems('center'),
						justifyContent('space-between'),

						color(cargoLoadLogoColor),
						backgroundColor(cargoLoadColor),
						boxShadow(pageContrastColor, 0, 0, 0, px(1), 'inset'),

						child('ui-identifier') (
							flexShrink(0),
							marginBlock(rem(0.25)),

							cargoLoadIdentifierFont,
							fontSize(rem(0.75))
						),

						child('ui-logo') (
							flexGrow(1),
							width(percentage(70)),
							marginBlock(rem(0.25)),

							media(maxWidth(px(750))) (
								height(rem(3))
							),

							backgroundColor(cargoLoadLogoColor)
						),

						child('ui-detail') (
							flexShrink(0),

							display('flex'),
							alignItems('center'),
							gap(rem(1)),
							marginBlock(rem(0.25)),

							fontSize(rem(0.75)),

							media(maxWidth(px(750))) (
								display('none').important()
							)
						)
					)
				)
			),

			child('ui-base') (
				display('block'),

				textAlign('center'),
				borderTop(px(2), 'solid', pageContrastColor)
			)
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

					descendant('ui-actions') (
						buttonGroupStyle(),
						marginTop(pageGutter.divide(2)),

						empty() (
							display('none')
						),

						child('ui-action') (
							buttonStyle()
						)
					),

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
