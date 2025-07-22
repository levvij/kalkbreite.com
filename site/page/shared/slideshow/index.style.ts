import { child, display, aspectRatio, backgroundColor, width, percentage, height, objectFit } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor } from "../../index.style";

export const slideshowStyle = () => child('ui-slideshow',
	display('block'),
	aspectRatio(captureAspectRatio),

	backgroundColor(captureBackgroundColor),

	child('img',
		width(percentage(100)),
		height(percentage(100)),

		objectFit('contain')
	)
);
