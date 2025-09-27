import { child, display, fontSize, height, marginBottom, marginTop, maxWidth, objectFit, padding, percentage, rem } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { pageGutter, pageSpacing } from "../index.style";
import { graffitiCollectionStyle } from "../shared/graffiti-collection/index.style";

export const artistStyle = () => child('ui-artist') (
	boxed(),
	padding(pageSpacing),

	child('ui-header') (
		display('block'),
		marginBottom(pageSpacing),

		child('img') (
			height(rem(4)),
			maxWidth(percentage(70)),

			objectFit('contain')
		),

		child('ui-name') (
			fontSize(rem(2))
		),

		child('ui-origin') (
			display('block'),
			marginTop(pageGutter)
		)
	),

	child('ui-detail') (
		display('block'),

		child('ui-description') (
			display('block'),
			marginBottom(pageSpacing)
		),

		graffitiCollectionStyle()
	)
);
