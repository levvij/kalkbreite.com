import { alignItems, backgroundColor, child, ColorValue, display, gap, height, marginTop, padding, rem, Variable, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { sectionStyle } from "./section/index.style";
import { layoutStyle } from "../shared/layout/index.style";
import { pageGutter, pageSpacing } from "../index.style";
import { collection, collectionItem } from "../shared/collection";

export const legendItemColor = new Variable<ColorValue>('legend-item-color');

export const layoutPageStyle = () => child('ui-layout') (
	boxed(),

	sectionStyle(),

	child('ui-overview') (
		display('block'),
		padding(pageSpacing),

		layoutStyle(),

		child('ui-legend') (
			collection(rem(10)),
			marginTop(pageSpacing),

			child('ui-item') (
				collectionItem(),

				display('flex'),
				gap(pageGutter),
				alignItems('center'),

				child('ui-color') (
					height(rem(0.75)),
					width(rem(0.75)),

					backgroundColor(legendItemColor)
				)
			)
		)
	)
);
