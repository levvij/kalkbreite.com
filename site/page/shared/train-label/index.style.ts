import { alignItems, child, display, em, fontSize, gap, height, lineHeight } from "@acryps/style";

export const trainLabelStyle = (size = em(1)) => child('ui-train-label') (
	display('flex'),
	alignItems('center'),
	gap(size.divide(2)),

	fontSize(size),
	lineHeight(1),

	child('img') (
		height(size)
	),

	child('ui-operator') (
		display('flex'),

		child('img') (
			height(size.multiply(0.65))
		)
	)
)
