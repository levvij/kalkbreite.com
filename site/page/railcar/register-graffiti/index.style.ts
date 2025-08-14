import { aspectRatio, backgroundColor, child, display, filter, flexBasis, flexGrow, flexShrink, fontSize, marginBottom, objectFit, opacity, padding, percentage, saturate, width } from "@acryps/style";
import { fieldStyle } from "../../shared/field.style";
import { boxed } from "../../shared/boxed";
import { captureAspectRatio, pageGutter, pageSpacing, primaryColor } from "../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";

export const registerGraffitiStyle = () => child('ui-register-graffiti',
	boxed(),
	padding(pageSpacing),

	fieldStyle(),

	child('ui-direction',
		display('flex'),
		marginBottom(pageGutter),

		child('ui-direction',
			flexGrow(1),
			flexBasis(0),

			display('block'),
			fontSize(0),

			filter(saturate(0)),
			backgroundColor(primaryColor),

			child('img',
				width(percentage(100)),
				aspectRatio(captureAspectRatio),

				objectFit('cover')
			)
		)
			.attribute('ui-active', filter('none'))
	),

	child('ui-actions',
		buttonGroupStyle(),

		child('ui-action',
			buttonStyle()
		)
	)
);
