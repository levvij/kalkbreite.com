import { alignItems, aspectRatio, backgroundColor, child, color, display, flexDirection, flexGrow, fontFamily, fontSize, fontWeight, height, justifyContent, justifySelf, marginBlock, marginBottom, objectFit, padding, percentage, ratio, rem, width } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, pageGutter, pageSpacing, primaryColor, runningNumberFont, tagFont } from "../index.style";
import { boxed } from "../shared/boxed";
import { collection, collectionItem } from "../shared/collection";

export const homeStyle = () => child('ui-home',
	boxed(),

	padding(pageSpacing),

	child('ui-guide',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-railcars',
		collection(rem(15)),

		child('ui-railcar',
			collectionItem(),

			display('flex'),
			flexDirection('column'),
			height(percentage(100)),

			child('img',
				width(percentage(100)),
				aspectRatio(captureAspectRatio),
				backgroundColor(captureBackgroundColor),

				objectFit('contain')
			),

			child('ui-header',
				flexGrow(1),

				display('flex'),
				justifyContent('space-between'),

				marginBlock(pageGutter.divide(2)),

				child('ui-name',
					fontSize(rem(1.2))
				),

				child('ui-tag',
					fontFamily(tagFont)
				)
			),

			child('ui-running-number',
				display('block'),

				fontFamily(runningNumberFont)
			)
		)
	)
);
