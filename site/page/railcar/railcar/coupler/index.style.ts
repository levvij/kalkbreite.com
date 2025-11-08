import { child, display, marginBottom, padding } from "@acryps/style";
import { pageGutter, pageSpacing } from "../../../index.style";
import { couplerIdentifierFont, trainIdentifierFont } from "../../../assets/font";

export const couplerStyle = () => child('ui-coupler') (
	display('block'),
	padding(pageSpacing),

	child('ui-type') (
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-identifier') (
		display('block'),

		couplerIdentifierFont
	)
)
