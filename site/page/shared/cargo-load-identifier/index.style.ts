import { alignContent, alignItems, border, child, display, em, fontSize, fontWeight, gap, lineHeight, padding, px } from "@acryps/style";
import { cargoLoadIdentifierFont } from "../../assets/font";

export const cargoLoadIdentifierStyle = () => child('ui-cargo-load-identifier') (
	display('flex'),
	alignContent('center'),
	gap(em(0.2)),

	lineHeight(1),
	cargoLoadIdentifierFont,

	child('ui-company') (
		fontWeight('bold')
	),

	child('ui-verification') (
		display('flex'),
		alignItems('center'),

		fontSize(em(0.8)),
		padding(em(0.2).subtract(px(1)).divide(2)),
		border(px(1), 'solid', 'currentColor')
	)
)
