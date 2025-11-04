import { child, padding } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { fieldStyle } from "../../shared/field.style";
import { pageSpacing } from "../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";

export const registerRailcarStyle = () => child('ui-register-railcar') (
	boxed(),
	padding(pageSpacing),

	fieldStyle(),

	child('ui-actions') (
		buttonGroupStyle(),

		child('ui-action') (
			buttonStyle()
		)
	)
)
