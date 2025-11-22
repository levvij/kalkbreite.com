import { alignItems, backgroundColor, child, ColorValue, display, flexShrink, fontSize, gap, height, lineHeight, marginBottom, marginTop, padding, rem, Variable, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { sectionStyle } from "./section/index.style";
import { layoutStyle } from "../shared/layout/index.style";
import { pageGutter, pageSpacing } from "../index.style";
import { collection, collectionItem } from "../shared/collection";
import { buttonGroupStyle, buttonStyle } from "../shared/button";

export const legendItemColor = new Variable<ColorValue>('legend-item-color');
const legendItemColorSize = rem(0.8);
const legendLineHeight = 1.2;

export const layoutPageStyle = () => child('ui-layout') (
	boxed(),

	sectionStyle(),

	child('ui-overview') (
		display('block'),
		padding(pageSpacing),

		child('ui-actions') (
			buttonGroupStyle(),
			marginBottom(pageSpacing),

			child('ui-action') (
				buttonStyle()
			)
		),

		layoutStyle(),

		child('ui-legend') (
			collection(rem(10)),
			marginTop(pageSpacing),

			child('ui-item') (
				collectionItem(),

				display('flex'),
				gap(pageGutter),
				alignItems('flex-start'),

				lineHeight(legendLineHeight),

				child('ui-color') (
					flexShrink(0),
					height(legendItemColorSize),
					width(legendItemColorSize),
					marginTop(rem(legendLineHeight).subtract(legendItemColorSize).divide(2)),

					backgroundColor(legendItemColor)
				),

				child('ui-detail') (
					child('ui-name') (
						display('block'),
						marginBottom(rem(0.25))
					),

					child('ui-description') (
						display('block'),

						fontSize(rem(0.75))
					)
				)
			)
		),

		child('ui-trains') (
			display('block'),

			child('ui-train') (
				display('block')
			)
		)
	)
);
