import { alignItems, attribute, backgroundColor, child, color, display, filter, flexBasis, flexDirection, flexGrow, fontSize, gap, height, hover, inset, invert, justifyContent, left, minHeight, not, objectFit, padding, percentage, position, rem, saturate, top, transform, translate, width } from "@acryps/style";
import { inputStyle } from "../field.style";
import { captureBackgroundColor, pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor } from "../../index.style";
import { clickable } from "../interaction";

export const railcarSideSelectStyle = () => child('ui-railcar-side-select') (
	display('flex'),
	flexDirection('column'),
	gap(pageGutter),

	child('select') (
		inputStyle()
	),

	child('ui-sides') (
		display('flex'),
		alignItems('center'),
		width(percentage(100)),
		gap(pageSpacing),

		child('ui-side') (
			flexGrow(1),
			flexBasis(0),

			position('relative'),

			not([attribute('ui-selected')]) (
				filter(saturate(0))
			),

			child('img') (
				width(percentage(100)),
				minHeight(rem(10)),

				clickable(),
				backgroundColor(primaryColor),

				objectFit('contain')
			),

			child('ui-name') (
				position('absolute'),
				top(percentage(50)),
				left(percentage(50)),

				padding(rem(0.5), rem(0.75)),

				transform(translate(percentage(-50), percentage(-50))),

				color(pageContrastColor),
				backgroundColor(pageColor)
			)
		)
	)
);
