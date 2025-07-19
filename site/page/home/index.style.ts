import { alignItems, aspectRatio, backgroundColor, child, color, display, flexDirection, flexGrow, fontFamily, fontSize, fontWeight, height, justifyContent, justifySelf, marginBlock, marginBottom, objectFit, padding, percentage, ratio, rem, width } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, pageGutter, pageSpacing, primaryColor, runningNumberFont, tagFont } from "../index.style";
import { boxed } from "../shared/boxed";
import { collection, collectionItem } from "../shared/collection";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";

export const homeStyle = () => child('ui-home',
	boxed(),

	padding(pageSpacing),

	child('ui-guide',
		display('block'),
		marginBottom(pageGutter)
	),

	railcarCollectionStyle()
);
