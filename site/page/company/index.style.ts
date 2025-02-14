import { alignItems, aspectRatio, backgroundColor, child, display, fontSize, justifyContent, marginBottom, marginInline, maxHeight, maxWidth, objectFit, objectPosition, paddingBlock, paddingInline, percentage, rem, vh, width } from "@acryps/style";
import { pageGutter, pageSpacing, captureBackgroundColor, captureAspectRatio } from "../index.style";
import { boxed } from "../shared/boxed";

export const companyStyle = () => child('ui-company',
	display('block'),

	child('ui-logo',
		display('block'),
		marginBottom(pageGutter),
		paddingInline(pageSpacing),
		paddingBlock(pageGutter),
		fontSize(0),

		backgroundColor(captureBackgroundColor),

		child('ui-image',
			boxed(),

			child('img',
				width(percentage(100)),
				maxHeight(vh(30)),
				maxWidth(rem(30)),

				objectFit('contain'),
				objectPosition('left')
			)
		)
	),

	child('ui-detail',
		boxed(),
		paddingInline(pageSpacing),

		child('ui-name',
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(2))
		),
	)
);
