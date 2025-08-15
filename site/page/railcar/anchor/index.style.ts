import { child, display, marginTop, padding } from "@acryps/style";
import { cropStyle } from "../../shared/crop/index.style";
import { boxed } from "../../shared/boxed";
import { pageSpacing } from "../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";

export const anchorStyle = () => child('ui-anchor',
	boxed(),

	child('ui-hint',
		display('block'),
		padding(pageSpacing)
	),

	cropStyle(),

	child('ui-actions',
		buttonGroupStyle(),
		marginTop(pageSpacing),

		child('ui-action',
			buttonStyle()
		)
	)
)
