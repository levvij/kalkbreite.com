import { alignItems, aspectRatio, backgroundColor, border, borderRadius, child, color, display, flexDirection, flexGrow, fontFamily, fontSize, fontWeight, gap, height, justifyContent, justifySelf, marginBlock, marginBottom, objectFit, overflow, padding, paddingBottom, paddingInline, percentage, px, ratio, rem, width } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, pageGutter, pageSpacing, primaryColor, radius, runningNumberFont, tagFont } from "../../index.style";
import { boxed } from "../../shared/boxed";
import { collection, collectionItem } from "../../shared/collection";
import { clickable } from "../interaction";

export const railcarCollectionStyle = () => child('ui-railcars',
	collection(rem(8)),

	child('ui-railcar',
		collectionItem(),

		display('flex'),
		flexDirection('column'),
		height(percentage(100)),

		border(px(1), 'solid', primaryColor),
		borderRadius(radius),
		overflow('hidden'),

		clickable(),

		child('img',
			width(percentage(100)),
			aspectRatio(captureAspectRatio),
			backgroundColor(captureBackgroundColor),

			objectFit('contain')
		),

		child('ui-header',
			flexGrow(1),

			display('flex'),
			justifyContent('space-between'),
			gap(rem(0.5)),
			padding(pageGutter),

			marginBlock(pageGutter.divide(2)),

			child('ui-name',
				fontSize(rem(1.2)),

				overflow('hidden')
			),

			child('ui-tag',
				fontFamily(tagFont)
			)
		),

		child('ui-running-number',
			display('block'),
			paddingInline(pageGutter),
			paddingBottom(pageGutter),

			fontFamily(runningNumberFont),
			fontSize(rem(0.8))
		)
	)
)
