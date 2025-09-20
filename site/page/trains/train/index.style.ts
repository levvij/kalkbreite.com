import { alignItems, boxShadow, child, display, flexDirection, flexWrap, fontSize, fontWeight, gap, height, marginBottom, marginInline, padding, paddingBlock, rem } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { pageGutter, pageSpacing } from "../../index.style";
import { trainIdentifierFont } from "../../assets/font";
import { clickable } from "../../shared/interaction";
import { coupleStyle } from "./couple/index.style";

export const trainStyle = () => child('ui-train',
	display('block'),

	coupleStyle(),

	child('ui-identifier',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2)),
		trainIdentifierFont
	),

	child('ui-units',
		display('flex'),
		flexWrap('wrap'),
		alignItems('center'),
		gap(pageGutter),

		child('ui-unit',
			display('flex'),
			flexDirection('column'),

			clickable(),

			child('img',
				height(rem(4))
			)
		),

		child('ui-action',
			clickable(),

			fontSize(rem(1.5))
		)
	)
);
