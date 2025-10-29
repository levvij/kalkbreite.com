import { aspectRatio, background, backgroundColor, child, display, marginTop, padding, percentage, ratio, rem, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { collection, collectionItem } from "../shared/collection";
import { captureBackgroundColor, pageGutter, pageSpacing } from "../index.style";

export const liveStyle = () => child('ui-live') (
	boxed(),

	padding(pageSpacing),

	child('ui-cameras') (
		collection(rem(30)),

		child('ui-camera') (
			collectionItem(),

			child('img') (
				width(percentage(100)),
				aspectRatio(ratio(16, 9)),

				backgroundColor(captureBackgroundColor)
			),

			child('ui-name') (
				display('block'),
				marginTop(rem(0.5))
			)
		)
	)
)
