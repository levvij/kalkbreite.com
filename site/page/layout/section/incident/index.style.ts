import { child, display, marginBottom } from "@acryps/style";
import { fieldStyle } from "../../../shared/field.style";
import { railcarCouplerSelectStyle } from "../../../shared/railcar-coupler-select/index.style";
import { buttonGroupStyle, buttonStyle } from "../../../shared/button";
import { railcarSelectStyle } from "../../../shared/railcar-select/index.style";
import { pageSpacing } from "../../../index.style";
import { monospacedFont } from "../../../assets/font";

export const incidentStyle = () => child('ui-report-incident') (
	child('ui-position') (
		display('block'),
		marginBottom(pageSpacing),

		monospacedFont
	),

	fieldStyle(
		railcarSelectStyle(),
		railcarCouplerSelectStyle()
	),

	child('ui-actions') (
		buttonGroupStyle(),

		child('ui-action') (
			buttonStyle()
		)
	)
);
