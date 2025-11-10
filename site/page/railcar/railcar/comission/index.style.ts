import { child, display, marginBlock, marginBottom } from "@acryps/style";
import { boxed } from "../../../shared/boxed";
import { monospacedFont } from "../../../assets/font";
import { pageSpacing } from "../../../index.style";
import { layoutStyle } from "../../../shared/layout/index.style";
import { buttonGroupStyle, buttonStyle } from "../../../shared/button";

export const comissionRailcarStyle = () => child('ui-comission') (
	boxed(),
	marginBlock(pageSpacing),

	layoutStyle(),

	child('ui-hint') (
		display('block')
	),

	child('ui-position') (
		display('block'),
		marginBlock(pageSpacing),

		monospacedFont
	),

	child('ui-actions') (
		buttonGroupStyle(),

		child('ui-action') (
			buttonStyle()
		)
	)
)
