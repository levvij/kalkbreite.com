import { child, display, fontSize, justifyContent, rem } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";
import { detailSectionStyle } from "../../shared/detail-section/index.style";
import { fieldStyle } from "../../shared/field.style";

export const maintenanceStyle = () => child('ui-maintenance')(
	boxed(),

	child('ui-header')(
		display('flex'),
		justifyContent('space-between'),

		child('ui-title')(
			fontSize(rem(2))
		),

		child('ui-actions')(
			buttonGroupStyle(),

			child('ui-action')(
				buttonStyle()
			)
		)
	),

	detailSectionStyle(),
	fieldStyle()
);
