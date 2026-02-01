import { child, display, flexWrap, gap, empty, padding, rem, marginBottom, backgroundColor, color, attribute, border, px, borderRadius, lineHeight } from "@acryps/style";
import { knockoutColor, knockoutContrastColor, pageGutter, primaryColor, primaryContrastColor, radius } from "../../index.style";
import { clickable } from "../interaction";

export const filtersStyle = () => child('ui-filters') (
	display('flex'),
	flexWrap('wrap'),
	gap(pageGutter),

	marginBottom(pageGutter),

	empty() (
		display('none')
	),

	child('ui-filter') (
		padding(rem(0.25), rem(0.5)),
		lineHeight(1),

		clickable(),

		color(knockoutColor),
		border(px(2), 'solid', 'currentColor'),
		borderRadius(radius),

		attribute('ui-active') (
			color(primaryColor)
		)
	)
);
