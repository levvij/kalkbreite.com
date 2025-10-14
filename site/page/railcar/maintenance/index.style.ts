import { child, display, fontSize, justifyContent, marginBottom, padding, rem } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";
import { detailSectionStyle } from "../../shared/detail-section/index.style";
import { fieldStyle } from "../../shared/field.style";
import { pageGutter, pageSpacing } from "../../index.style";

export const maintenanceStyle = () => child('ui-maintenance')(
	boxed(),
	padding(pageSpacing),

	child('ui-header') (
		display('flex'),
		justifyContent('space-between'),
		marginBottom(pageGutter),

		child('ui-title') (
			fontSize(rem(2))
		),

		child('ui-actions') (
			buttonGroupStyle(),

			child('ui-action') (
				buttonStyle()
			)
		)
	),

	detailSectionStyle(
		marginBottom(pageGutter)
	),

	fieldStyle()
);
