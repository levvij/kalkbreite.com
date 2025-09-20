import { alignItems, boxSizing, child, display, flexGrow, flexShrink, fontSize, gap, height, lineHeight, objectFit, objectPosition, overflow, percentage, rem, width } from "@acryps/style";
import { boxed } from "../../../shared/boxed";
import { pageGutter } from "../../../index.style";
import { trainIdentifierFont } from "../../../assets/font";

const trainHeight = rem(3);

export const coupleStyle = () => child('ui-couple',
	boxed(),
	overflow('hidden'),

	display('flex'),
	gap(pageGutter),

	child('ui-source',
		width(percentage(30)),
		flexShrink(0),

		child('img',
			height(trainHeight),
			width(percentage(100)),

			objectPosition('right'),
			objectFit('contain')
		)
	),

	child('ui-icon',
		lineHeight(trainHeight),

		fontSize(rem(1.5))
	),

	child('ui-trains',
		flexGrow(1),

		child('ui-train',
			display('flex'),
			alignItems('center'),
			gap(pageGutter),

			child('ui-identifier',
				trainIdentifierFont
			),

			child('img',
				height(trainHeight),
				width(percentage(100)),

				objectPosition('left'),
				objectFit('contain')
			)
		)
	)
)
