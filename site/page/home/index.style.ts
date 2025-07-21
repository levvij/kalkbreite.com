import { alignItems, aspectRatio, backgroundColor, child, color, display, flexDirection, flexGrow, fontFamily, fontSize, fontWeight, height, justifyContent, justifySelf, marginBlock, marginBottom, objectFit, padding, percentage, ratio, rem, vh, width } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, pageGutter, pageSpacing, primaryColor, runningNumberFont, tagFont } from "../index.style";
import { boxed } from "../shared/boxed";
import { collection, collectionItem } from "../shared/collection";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { buttonGroupStyle, buttonStyle } from "../shared/button";

export const homeStyle = () => child('ui-home',
	display('block'),

	child('ui-slideshow',
		display('block'),
		aspectRatio(captureAspectRatio),

		backgroundColor(captureBackgroundColor),

		child('img',
			width(percentage(100)),
			height(percentage(100)),

			objectFit('contain')
		)
	),

	child('ui-content',
		boxed(),

		padding(pageSpacing),

		child('ui-guide',
			display('block'),
			marginBottom(pageGutter)
		),

		child('ui-actions',
			buttonGroupStyle(),
			marginBottom(pageGutter),

			child('ui-action',
				buttonStyle()
			)
		),

		railcarCollectionStyle()
	)
);
