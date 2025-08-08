import { child, display, margin, marginInline, maxWidth, rem } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { pageSpacing } from "../index.style";
import { fieldStyle } from "../shared/field.style";
import { buttonStyle } from "../shared/button";

export const loginStyle = () => child('ui-login',
	boxed(),
	margin(pageSpacing),

	child('ui-form',
		display('block'),
		maxWidth(rem(15)),
		marginInline('auto'),

		fieldStyle(),

		child('ui-action', buttonStyle())
	)
)
