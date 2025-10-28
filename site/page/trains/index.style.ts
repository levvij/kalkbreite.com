import { alignItems, AnimationDurationStyleProperty, boxShadow, child, display, gap, height, marginBottom, opacity, overflowX, padding, percentage, px, rem, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { pageGutter, pageSpacing } from "../index.style";
import { trainStyle } from "./train/index.style";
import { monospacedFont, trainIdentifierFont } from "../assets/font";

export const trainsStyle = () => child('ui-trains') (
	boxed(),
	padding(pageSpacing),

	trainStyle(),

	child('ui-list') (
		display('block'),

		child('ui-train') (
			display('block'),
			marginBottom(pageGutter),

			child('ui-detail') (
				display('flex'),
				alignItems('center'),
				gap(pageGutter),
				marginBottom(pageGutter.divide(2)),

				child('ui-identifier') (
					trainIdentifierFont
				),

				child('ui-type') (
					monospacedFont,

					opacity(0.5)
				),

				child('ui-changed') (
					monospacedFont
				)
			),

			child('ui-capture') (
				display('block'),
				overflowX('auto'),

				child('img') (
					height(px(50))
				)
			)
		)
	)
)
