import { backgroundColor, child, color, display, filter, fontSize, fontWeight, height, invert, marginBottom, padding, rem } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { graffitiPreviewStyle } from "../shared/graffiti-preview/index.style";
import { knockoutColor, knockoutContrastColor, pageGutter, pageSpacing } from "../index.style";

export const graffitiStyle = () => child('ui-graffiti',
	boxed(),

	graffitiPreviewStyle(),

	child('ui-detail',
		display('block'),
		padding(pageSpacing),

		child('ui-name',
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(1.5)),
			fontWeight('bold')
		),

		child('ui-description',
			display('block'),
			marginBottom(pageGutter)
		),

		child('ui-artist',
			display('inline-block'),
			padding(pageGutter),

			color(knockoutContrastColor),
			backgroundColor(knockoutColor),

			child('img',
				height(rem(5)),
				marginBottom(pageGutter),

				filter(invert(1))
			),

			child('ui-name',
				display('block')
			)
		)
	)
);
