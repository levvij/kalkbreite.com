import { child } from "@acryps/style";
import { fieldStyle } from "../../../shared/field.style";
import { railcarCouplerSelectStyle } from "../../../shared/railcar-coupler-select/index.style";
import { buttonGroupStyle, buttonStyle } from "../../../shared/button";

export const incidentStyle = () => child('ui-report-incident') (
	fieldStyle(
		railcarCouplerSelectStyle()
	),

	child('ui-actions') (
		buttonGroupStyle(),

		child('ui-action') (
			buttonStyle()
		)
	)
);
