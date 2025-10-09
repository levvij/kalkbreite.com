import { alignItems, aspectRatio, backgroundColor, child, display, fontSize, height, justifyContent, marginBottom, marginInline, marginTop, maxHeight, maxWidth, objectFit, objectPosition, padding, paddingBlock, paddingInline, percentage, rem, textDecorationLine, vh, width } from "@acryps/style";
import { pageGutter, pageSpacing, captureBackgroundColor, captureAspectRatio } from "../index.style";
import { boxed } from "../shared/boxed";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { clickable } from "../shared/interaction";

export const companyStyle = () => child('ui-company') (
	boxed(),
	padding(pageSpacing),

	child('ui-header') (
		display('block'),
		marginBottom(pageSpacing),

		child('ui-logo') (
			display('block'),
			marginBottom(pageGutter),

			child('img') (
				height(rem(3)),
				maxWidth(percentage(100)),

				objectFit('contain'),
				objectPosition('left')
			)
		),

		child('ui-name') (
			display('block'),

			fontSize(rem(2))
		),

		child('ui-shortname') (
			display('block'),
			marginTop(pageGutter)
		),

		child('ui-parent') (
			display('block'),
			marginTop(rem(0.25)),

			clickable(),
			textDecorationLine('underline')
		)
	),

	child('ui-detail') (
		display('block'),

		child('ui-description') (
			display('block'),
			marginBottom(pageSpacing)
		),

		railcarCollectionStyle()
	)
);
