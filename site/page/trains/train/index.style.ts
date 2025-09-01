import { boxShadow, child, display, flexDirection, flexWrap, fontSize, fontWeight, height, marginBottom, padding, paddingBlock, rem } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { pageGutter, pageSpacing } from "../../index.style";
import { trainIdentifierFont } from "../../assets/font";
import { clickable } from "../../shared/interaction";

export const trainStyle = () => child('ui-train',
	display('block'),

	child('ui-identifier',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2)),
		trainIdentifierFont
	),

	child('ui-units',
		display('flex'),
		flexWrap('wrap'),

		child('ui-unit',
			display('flex'),
			flexDirection('column'),

			clickable(),

			child('img',
				height(rem(4))
			)
		)
	)
);
