import { attribute, attributeIn, ch, child, columnGap, ColumnGapGlobalStyleProperty, display, empty, fontSize, fontWeight, FontWeightGlobalStyleProperty, margin, marginBlock, marginBottom, marginLeft, marginRight, opacity, paddingInline, PaddingInlineGlobalStyleProperty, paddingRight, percentage, rem, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { pageGutter, pageSpacing } from "../index.style";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { monospacedFont, uicIdentifierFont } from "../assets/font";

export const railcarModelStyle = () => child('ui-railcar-model')(
	boxed(),

	paddingInline(pageSpacing),
	marginBlock(pageSpacing),

	child('ui-technical-drawing') (
		display('block'),

		margin(pageSpacing),

		child('img') (
			width(percentage(100))
		)
	),

	child('ui-name') (
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-summary') (
		display('block'),
		marginBottom(pageGutter),

		empty() (
			display('none')
		)
	),

	child('ui-uic-identifier') (
		display('table'),
		marginBottom(pageSpacing),

		child('ui-part') (
			display('table-row'),

			attribute('ui-type', 'class') (
				fontWeight('bold')
			),

			child('ui-code') (
				display('table-cell'),
				paddingRight(pageGutter),

				uicIdentifierFont
			),

			child('ui-name') (
				display('table-cell'),

				child('ui-locale') (
					display('inline-block'),
					marginLeft(ch(1)),

					opacity(0.5)
				)
			)
		)
	),

	railcarCollectionStyle()
);
