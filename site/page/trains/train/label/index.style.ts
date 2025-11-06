import { child, display, marginBottom, rem } from "@acryps/style";
import { trainLabelStyle } from "../../../shared/train-label/index.style";
import { fieldStyle } from "../../../shared/field.style";
import { buttonGroupStyle, buttonStyle } from "../../../shared/button";
import { pageSpacing } from "../../../index.style";

export const assignTrainLabelStyle = () => child('ui-assign-label') (
	display('block'),

	child('ui-label') (
		display('block'),
		marginBottom(pageSpacing),

		trainLabelStyle(rem(3))
	),

	fieldStyle(),

	child('ui-actions') (
		buttonGroupStyle(),

		child('ui-action') (
			buttonStyle()
		)
	)
)
