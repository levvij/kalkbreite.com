import { backgroundColor, borderBottom, borderLeft, borderRight, borderTop, bottom, child, display, hex, inset, insetBlock, insetInline, left, margin, marginBlock, marginBottom, marginInline, marginTop, percentage, position, px, rem, Rem, right, top, userSelect, width } from "@acryps/style";
import { pageSpacing } from "../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";
import { boxed } from "../../shared/boxed";

const handleSize = rem(2);

export const assignStyle = () => child('ui-assign',
	boxed(),

	child('ui-wrapper',
		display('block'),
		margin(pageSpacing),

		userSelect('none'),

		child('ui-canvas',
			display('block'),

			position('relative'),
			marginBlock(handleSize.add(pageSpacing)),
			marginInline(handleSize),

			child('img',
				width(percentage(100))
			),

			child('ui-crop',
				position('absolute'),
				backgroundColor(hex('0006')),

				child('ui-handle',
					position('absolute'),
					inset(0),

					backgroundColor(hex('f00c'))
				)
			)
			.attribute('ui-property', 'top',
				top(0),
				insetInline(0),

				child('ui-handle', top(percentage(100).subtract(handleSize)))
			)
			.attribute('ui-property', 'left',
				left(0),
				insetBlock(0),

				child('ui-handle', left(percentage(100).subtract(handleSize)))
			)
			.attribute('ui-property', 'right',
				right(0),
				insetBlock(0),

				child('ui-handle', right(percentage(100).subtract(handleSize)))
			)
			.attribute('ui-property', 'bottom',
				bottom(0),
				insetInline(0),

				child('ui-handle', bottom(percentage(100).subtract(handleSize)))
			)
		)
	),

	child('canvas',
		width(percentage(100))
	),

	child('ui-actions',
		buttonGroupStyle(),
		marginTop(pageSpacing),

		child('ui-action',
			buttonStyle()
		)
	)
);
