import { borderRadius, child, display, flexShrink, fontSize, height, justifyContent, lastOfType, marginBottom, maxHeight, maxWidth, objectFit, objectPosition, percentage, rem, vh } from "@acryps/style";
import { pageGutter, pageSpacing, radius } from "../../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../../shared/button";
import { detailSectionStyle } from "../../../shared/detail-section/index.style";
import { endDivider } from "../../../shared/divider";
import { fieldStyle } from "../../../shared/field.style";
import { graffitiCollectionStyle } from "../../../shared/graffiti-collection/index.style";

export const graffitiInspirationStyle = () => child('ui-graffiti-inspiration') (
	display('block'),

	child('ui-media') (
		display('flex'),
		justifyContent('flex-start'),

		marginBottom(pageGutter),
		fontSize(0),

		lastOfType() (
			marginBottom(pageSpacing)
		),

		child('img') (
			maxWidth(percentage(100)),
			maxHeight(vh(40)),

			borderRadius(radius)
		)
	),

	child('ui-detail') (
		display('block'),

		endDivider(),

		fieldStyle(),
		detailSectionStyle(),

		child('ui-actions') (
			buttonGroupStyle(),
			marginBottom(pageSpacing),

			child('ui-action') (
				buttonStyle()
			)
		),

		child('ui-title') (
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(2))
		),

		child('ui-description') (
			display('block'),
			marginBottom(pageGutter)
		)
	),

	graffitiCollectionStyle()
)
