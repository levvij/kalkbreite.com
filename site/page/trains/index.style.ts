import { alignItems, AnimationDurationStyleProperty, attribute, backgroundColor, border, borderRadius, boxShadow, child, display, flexWrap, fontSize, gap, height, hex, marginBottom, marginRight, opacity, overflowX, padding, percentage, px, rad, rem, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { knockoutColor, pageGutter, pageSpacing, radius } from "../index.style";
import { trainStyle } from "./train/index.style";
import { monospacedFont, trainIdentifierFont } from "../assets/font";
import { clickable } from "../shared/interaction";
import { trainLabelStyle } from "../shared/train-label/index.style";

export const trainsStyle = () => child('ui-trains') (
	boxed(),
	padding(pageSpacing),

	trainStyle(),

	child('ui-hint') (
		display('block'),
		marginBottom(pageSpacing)
	),

	child('ui-filters') (
		display('flex'),
		flexWrap('wrap'),
		gap(pageGutter.divide(2)),

		marginBottom(pageSpacing),

		child('ui-product-brand') (
			padding(rem(0.25)),

			clickable(),

			fontSize(0),
			border(px(1), 'solid', knockoutColor),
			borderRadius(radius),

			attribute('ui-active') (
				backgroundColor(knockoutColor)
			),

			child('img') (
				height(rem(1)),

				backgroundColor(hex('fff')),
				borderRadius(px(2))
			)
		)
	),

	child('ui-list') (
		display('block'),

		child('ui-train') (
			display('block'),
			marginBottom(pageGutter),

			trainLabelStyle(),

			child('ui-detail') (
				display('flex'),
				alignItems('center'),
				gap(pageGutter),
				marginBottom(pageGutter.divide(2)),

				clickable(),
				fontSize(rem(0.8)),

				child('ui-identifier') (
					trainIdentifierFont,
				),

				child('ui-coupled-length') (
					monospacedFont,

					opacity(0.5)
				),

				child('ui-railcar-count') (
					monospacedFont,

					opacity(0.5)
				),

				child('ui-changed') (
					monospacedFont
				)
			),

			child('ui-capture') (
				display('block'),
				overflowX('auto'),

				child('img') (
					height(px(50))
				)
			)
		)
	)
)
