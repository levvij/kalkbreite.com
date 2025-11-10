import { child, display, padding, marginTop, position, insetBlock, left, percentage, height, opacity } from "@acryps/style";
import { pageSpacing } from "../../../index.style";
import { boxed } from "../../../shared/boxed";
import { buttonGroupStyle, buttonStyle } from "../../../shared/button";
import { cropStyle } from "../../../shared/crop/index.style";

export const anchorStyle = () => child('ui-anchor') (
	boxed(),

	child('ui-hint') (
		display('block'),
		padding(pageSpacing)
	),

	cropStyle(
		child('ui-reference') (
			child('img') (
				position('absolute'),
				insetBlock(0),
				left(percentage(100)),

				height(percentage(100)),

				opacity(0.5)
			)
		)
	),

	child('ui-actions') (
		buttonGroupStyle(),
		marginTop(pageSpacing),

		child('ui-action') (
			buttonStyle()
		)
	)
)
