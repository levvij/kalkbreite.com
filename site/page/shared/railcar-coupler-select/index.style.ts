import { alignItems, attribute, backgroundColor, child, display, filter, flexDirection, fontSize, gap, height, hover, inset, invert, justifyContent, padding, percentage, position, rem, width } from "@acryps/style";
import { inputStyle } from "../field.style";
import { pageColor, pageGutter } from "../../index.style";
import { clickable } from "../interaction";

export const railcarCouplerSelectStyle = () => child('ui-railcar-coupler-select') (
	display('flex'),
	flexDirection('column'),
	gap(pageGutter),

	child('select') (
		inputStyle()
	),

	child('ui-capture') (
		position('relative'),

		child('img') (
			width(percentage(100))
		),

		child('ui-couplers') (
			position('absolute'),
			inset(pageGutter),

			display('flex'),
			alignItems('center'),
			justifyContent('space-between'),

			child('ui-coupler') (
				padding(pageGutter),

				clickable(),
				backgroundColor(pageColor),
				fontSize(0),

				hover() (
					filter(invert(1))
				),

				attribute('ui-selected') (
					filter(invert(1))
				),

				child('svg') (
					width(rem(2)),
					height(rem(2))
				)
			)
		)
	)
);
