import { alignItems, attribute, background, backgroundColor, child, display, filter, flexDirection, flexGrow, flexShrink, fontSize, gap, height, hover, inset, invert, justifyContent, padding, percentage, position, rem, width } from "@acryps/style";
import { inputStyle } from "../field.style";
import { captureBackgroundColor, pageColor, pageGutter } from "../../index.style";
import { clickable } from "../interaction";

export const railcarSelectStyle = () => child('ui-railcar-select') (
	display('flex'),
	flexDirection('column'),
	gap(pageGutter),

	child('select') (
		inputStyle()
	),

	child('ui-capture') (
		display('flex'),
		alignItems('center'),

		backgroundColor(captureBackgroundColor),

		child('img') (
			width(percentage(50))
		)
	)
);
