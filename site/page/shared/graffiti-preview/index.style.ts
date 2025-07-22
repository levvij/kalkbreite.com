import { child, display, fontSize, percentage, width } from "@acryps/style";

export const graffitiPreviewStyle = () => child('ui-graffiti-preview',
	display('block'),
	width(percentage(100)),

	fontSize(0),

	child('canvas',
		width(percentage(100))
	)
)
