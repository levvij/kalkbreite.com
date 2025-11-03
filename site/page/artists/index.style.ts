import { alignItems, borderRadius, child, display, empty, fontSize, fontStyle, gap, height, justifyContent, marginBottom, marginRight, marginTop, maxWidth, objectFit, objectPosition, overflowX, padding, percentage, rem, vw } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { pageGutter, pageSpacing, radius } from "../index.style";
import { clickable } from "../shared/interaction";
import { buttonGroupStyle, buttonStyle } from "../shared/button";

export const artistsStyle = () => child('ui-artists') (
	boxed(),

	padding(pageSpacing),

	child('ui-hint') (
		display('block'),
		marginBottom(pageSpacing)
	),

	child('ui-actions') (
		buttonGroupStyle(),

		child('ui-action') (
			buttonStyle()
		)
	),

	child('ui-artist') (
		display('block'),
		marginTop(pageSpacing),

		child('ui-header') (
			display('flex'),
			alignItems('center'),
			gap(pageGutter),

			clickable(),

			child('ui-name') (
				display('block'),
				fontSize(rem(1.5))
			),

			child('ui-logo') (
				display('block'),

				child('img') (
					display('block'),
					height(rem(2)),
					maxWidth(vw(50)),

					objectFit('contain'),
					objectPosition('left')
				),

				child('ui-name') (
					display('block'),
					marginTop(rem(0.125)),

					fontStyle('italic')
				)
			),

			child('ui-icon') (
				fontSize(rem(1.5))
			)
		),

		child('ui-summary') (
			display('block'),
			marginTop(rem(0.25)),

			empty() (
				display('none')
			)
		),

		child('ui-graffitis') (
			display('flex'),
			gap(pageGutter),
			overflowX('auto'),

			marginTop(pageGutter),

			child('ui-graffiti') (
				display('block'),
				clickable(),

				child('img') (
					height(rem(5)),
					borderRadius(radius)
				)
			)
		)
	)
);
