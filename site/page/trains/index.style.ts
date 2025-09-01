import { alignItems, AnimationDurationStyleProperty, boxShadow, child, display, gap, marginBottom, opacity, padding, percentage, rem, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { pageGutter, pageSpacing } from "../index.style";
import { trainStyle } from "./train/index.style";
import { monospacedFont, trainIdentifierFont } from "../assets/font";

export const trainsStyle = () => child('ui-trains',
	boxed(),
	padding(pageSpacing),

	trainStyle(),

	child('ui-list',
		display('block'),

		child('ui-train',
			display('flex'),
			alignItems('center'),
			gap(pageGutter),
			marginBottom(pageGutter.divide(2)),

			child('ui-identifier',
				trainIdentifierFont
			),

			child('ui-type',
				monospacedFont,

				opacity(0.5)
			),

			child('ui-changed',
				monospacedFont
			)
		)
	)
)
