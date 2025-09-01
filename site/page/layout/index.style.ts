import { child, fill, height, hex, maxHeight, padding, percentage, px, select, stroke, strokeWidth, vectorEffect, vh, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { pageColor, pageContrastColor, pageSpacing, primaryColor } from "../index.style";

export const layoutStyle = () => child('ui-layout',
	boxed(),

	padding(pageSpacing),

	child('svg',
		width(percentage(100)),
		maxHeight(vh(70)),

		select('path',
			fill('none'),
			stroke(pageContrastColor),
			strokeWidth(px(1)),
			vectorEffect('non-scaling-stroke')
		),

		select('rect',
			width(px(1)),
			height(px(1)),

			fill('transparent'),
			stroke(hex('eee')),
			strokeWidth(px(1)),
			vectorEffect('non-scaling-stroke')
		)
	)
);
