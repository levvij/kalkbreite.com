import { child, display, aspectRatio, backgroundColor, width, percentage, height, objectFit, maxHeight, vh, marginLeft, milliseconds, overflow, paddingLeft } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, pageSpacing } from "../../index.style";

export const moveDuration = milliseconds(500);

export const slideshowStyle = () => child('ui-slideshow') (
	display('flex'),
	maxHeight(vh(40)),
	width(percentage(100)),
	aspectRatio(captureAspectRatio),
	paddingLeft(pageSpacing),
	overflow('hidden'),

	backgroundColor(captureBackgroundColor),

	child('img') (
		marginLeft(0).transition(moveDuration),
		height(percentage(100))
	)
);
