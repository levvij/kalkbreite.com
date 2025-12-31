import { child, display, marginBottom, padding } from "@acryps/style";
import { pageGutter, pageSpacing } from "../../../index.style";
import { couplerIdentifierFont, trainIdentifierFont } from "../../../assets/font";
import { boxed } from "../../../shared/boxed";

export const couplerStyle = () => child('ui-coupler') (
	boxed(),

	child('ui-type') (
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-identifier') (
		display('block'),

		couplerIdentifierFont
	)
)
