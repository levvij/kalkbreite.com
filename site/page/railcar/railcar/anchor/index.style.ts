import { child, display, padding, marginTop } from "@acryps/style";
import { pageSpacing } from "../../../index.style";
import { boxed } from "../../../shared/boxed";
import { buttonGroupStyle, buttonStyle } from "../../../shared/button";
import { cropStyle } from "../../../shared/crop/index.style";

export const anchorStyle = () => child('ui-anchor') (
	boxed(),

	child('ui-hint') (
		display('block'),
		padding(pageSpacing)
	),

	cropStyle(),

	child('ui-actions') (
		buttonGroupStyle(),
		marginTop(pageSpacing),

		child('ui-action') (
			buttonStyle()
		)
	)
)
