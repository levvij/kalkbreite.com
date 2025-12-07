import { attribute, child, descendant, fill, height, hex, hover, maxHeight, padding, percentage, pointerEvents, px, rem, stroke, strokeLinecap, strokeLinejoin, strokeWidth, vectorEffect, vh, width } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { pageColor, pageContrastColor, pageSpacing, primaryColor } from "../../index.style";
import { clickable } from "../interaction";

export const layoutStyle = () => child('ui-layout') (
	boxed(),

	child('svg') (
		width(percentage(100)),
		maxHeight(vh(80)),

		descendant('g') (
			hover() (child('path') (attribute('ui-main') (
				stroke(primaryColor),
			))),

			attribute('ui-highlight') (
				child('path') (attribute('ui-backdrop') (
					stroke(primaryColor)
				))
			),

			child('path') (
				fill('none'),

				clickable(),

				attribute('ui-main') (
					stroke(pageContrastColor),
					strokeWidth(px(0.2)),
					strokeLinejoin('bevel'),
					strokeLinecap('round'),

					pointerEvents('none')
				),

				attribute('ui-backdrop') (
					stroke('transparent'),
					strokeWidth(px(0.5))
				),

				attribute('ui-marker') (
					strokeWidth(px(0.225))
				),
			)
		),

		child('path') (
			width(px(1)),
			height(px(1)),

			fill('transparent'),
			stroke(hex('ccc8')),
			strokeWidth(px(1)),
			vectorEffect('non-scaling-stroke')
		)
	)
);
