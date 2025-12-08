import { after, alignItems, attribute, attributeIn, backgroundColor, border, borderBottom, borderInline, bottom, ch, child, color, columnGap, ColumnGapGlobalStyleProperty, content, display, em, empty, flexDirection, FlexDirectionGlobalStyleProperty, fontSize, fontWeight, FontWeightGlobalStyleProperty, gap, height, hex, inset, justifyContent, justifySelf, left, lineHeight, margin, marginBlock, marginBottom, marginLeft, marginRight, marginTop, maxWidth, media, opacity, overflow, padding, paddingBlock, paddingBottom, paddingInline, PaddingInlineGlobalStyleProperty, paddingRight, paddingTop, Percentage, percentage, pointerEvents, position, px, rem, right, textAlign, top, Variable, width, zIndex } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { cargoFixtureColor, cargoSlotColor, cargoSlotContrastColor, pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor, primaryContrastColor } from "../index.style";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { monospacedFont, uicIdentifierFont } from "../assets/font";

export const cargoOffset = new Variable<Percentage>('cargo-offset');
export const cargoLength = new Variable<Percentage>('cargo-length');

export const railcarModelStyle = () => child('ui-railcar-model')(
	boxed(),

	paddingInline(pageSpacing),
	marginBlock(pageSpacing),

	child('ui-technical-drawing') (
		display('block'),

		margin(pageSpacing),

		child('img') (
			width(percentage(100))
		)
	),

	child('ui-name') (
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-summary') (
		display('block'),
		marginBottom(pageGutter),

		empty() (
			display('none')
		)
	),

	child('ui-uic-identifier') (
		display('table'),
		marginBottom(pageSpacing),

		child('ui-part') (
			display('table-row'),

			attribute('ui-type', 'class') (
				fontWeight('bold')
			),

			child('ui-code') (
				display('table-cell'),
				paddingRight(pageGutter),

				uicIdentifierFont
			),

			child('ui-name') (
				display('table-cell'),

				child('ui-locale') (
					display('inline-block'),
					marginLeft(ch(1)),

					opacity(0.5)
				)
			)
		)
	),

	child('ui-cargo-slots') (
		display('block'),
		marginBottom(pageSpacing),
		position('relative'),
		overflow('hidden'),

		after() (
			content(''),
			pointerEvents('none'),

			position('absolute'),
			inset(0),
			zIndex(100),

			borderInline(px(1), 'dashed', pageContrastColor)
		),

		child('ui-variant') (
			display('flex'),
			marginBottom(pageGutter),

			child('ui-slot') (
				display('inline-flex'),
				gap(px(2)),
				flexDirection('column'),

				marginLeft(cargoOffset),
				marginRight(px(1)),
				width(cargoLength.subtract(px(1))),
				position('relative'),

				after() (
					content(''),
					pointerEvents('none'),

					position('absolute'),
					inset(0),
					zIndex(100),

					borderInline(px(1), 'dotted', cargoFixtureColor)
				),

				child('ui-load-type') (
					display('flex'),
					alignItems('center'),
					justifyContent('space-between'),

					marginLeft(cargoOffset),
					width(cargoLength
						.subtract(px(2)) // border
						.subtract(pageGutter.multiply(2)) // text padding
						.add(cargoOffset.multiply(2)) // move inside fixture padding
					),

					paddingInline(pageGutter.subtract(cargoOffset)),
					paddingBlock(rem(0.25)),

					border(px(1), 'solid', pageContrastColor),
					color(cargoSlotContrastColor),
					backgroundColor(cargoSlotColor),
					lineHeight(1),

					attribute('ui-overlap', 'even') (
						marginTop(em(1)
							.add(px(1)) // border
							.add(rem(0.25).multiply(2)) // padding
						)
					),

					attribute('ui-overlap', 'odd') (
						marginBottom(em(1)
							.add(px(1)) // border
							.add(rem(0.25).multiply(2)) // padding
						)
					),

					child('ui-length') (
						fontSize(rem(0.75))
					)
				),

				child('ui-detail') (
					display('flex'),
					justifyContent('space-between'),
					alignItems('center'),
					marginTop('auto'),
					paddingTop(rem(0.25)),
					paddingInline(pageGutter),

					color(cargoFixtureColor),
					borderBottom(px(2), 'solid', cargoFixtureColor),

					child('ui-length') (
						fontSize(rem(0.75))
					)
				)
			)
		),

		child('ui-base') (
			display('flex'),
			alignItems('center'),
			justifyContent('space-between'),
			paddingInline(pageGutter),

			child('ui-length') (
				fontSize(rem(0.75))
			)
		),

		child('ui-fixture-points') (
			display('block'),
			height(rem(1)),
			lineHeight(1),
			position('relative'),

			borderBottom(px(2), 'solid', pageContrastColor),

			child('ui-fixture') (
				position('absolute'),
				bottom(rem(-0.25)),

				attribute('ui-side', 'head') (left(cargoOffset)),
				attribute('ui-side', 'tail') (right(percentage(100).subtract(cargoOffset)))
			)
		)
	),

	media(maxWidth(px(500))) (
		child('ui-cargo-slots') (
			fontSize(rem(0.8)),

			child('ui-variant') (
				child('ui-slot') (
					child('ui-load-type') (
						child('ui-length') (
							display('none')
						)
					),

					child('ui-detail') (
						child('ui-length') (
							display('none')
						)
					)
				)
			)
		)
	),

	railcarCollectionStyle()
);
