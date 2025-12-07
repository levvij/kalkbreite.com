import { alignItems, aspectRatio, backgroundColor, borderRadius, child, color, display, fontSize, justifyContent, margin, objectFit, padding, percentage, Rad, ratio, Ratio, rem, width } from "@acryps/style";
import { collection, collectionItem } from "../../../shared/collection";
import { knockoutColor, knockoutContrastColor, pageSpacing, radius } from "../../../index.style";

export const assignGraffitiInspirationStyle = () => child('ui-assign-inspiration') (
	collection(rem(10)),
	margin(pageSpacing),

	child('ui-empty') (
		collectionItem(),

		display('flex'),
		alignItems('center'),
		justifyContent('center'),

		padding(pageSpacing),

		color(knockoutContrastColor),
		backgroundColor(knockoutColor),
		borderRadius(radius)
	),

	child('ui-inspiration') (
		collectionItem(),

		fontSize(0),

		child('img') (
			width(percentage(100)),
			aspectRatio(ratio(1, 1)),

			objectFit('cover'),
			borderRadius(radius)
		)
	)
)
