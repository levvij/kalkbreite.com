import { child, display, alignItems, flexWrap, gap, width, min, percentage, rem, marginBottom, fontSize, lineHeight, height, maxWidth, objectFit, flexGrow, justifyContent, marginRight, style, select, textDecorationLine } from "@acryps/style";
import { monospacedFont } from "../../assets/font";
import { pageSpacing } from "../../index.style";
import { collection, collectionItem } from "../collection";
import { endDivider } from "../divider";
import { clickable } from "../interaction";

export const detailSectionStyle = (...header) => child('ui-detail-section',
	display('flex'),
	alignItems('flex-start'),
	flexWrap('wrap'),
	gap(pageSpacing),

	header,

	style('>:first-child',
		display('block'),
		width(min(percentage(100), rem(20)))
	),

	child('ui-sections',
		flexGrow(1),
		collection(rem(20)),

		child('ui-metric',
			collectionItem(),

			display('flex'),
			justifyContent('space-between'),
			alignItems('center'),

			child('ui-name',
				display('flex'),
				alignItems('center'),
				gap(rem(0.5))
			),

			child('ui-value',
				monospacedFont
			)
		)
			.attribute('ui-link',
				textDecorationLine('underline'),

				clickable()
			),

		child('ui-stakeholder',
			collectionItem(),

			display('flex'),
			justifyContent('space-between'),
			alignItems('center'),

			child('ui-name',
				display('flex'),
				alignItems('center'),
				gap(rem(0.5))
			),

			child('ui-company',
				display('flex'),
				alignItems('center'),

				clickable(),

				child('img',
					height(rem(1)),
					maxWidth(rem(6)),

					objectFit('contain')
				)
			)
		)
	)
);
