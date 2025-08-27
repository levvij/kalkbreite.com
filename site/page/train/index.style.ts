import { child, display, flexDirection, flexWrap, height, rem } from "@acryps/style";

export const trainStyle = () => child('ui-train',
	display('flex'),
	flexWrap('wrap'),

	child('ui-unit',
		display('flex'),
		flexDirection('column'),

		child('img',
			height(rem(4))
		)
	)
);
