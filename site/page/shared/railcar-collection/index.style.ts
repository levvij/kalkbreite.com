import { alignItems, aspectRatio, backgroundColor, border, borderRadius, child, color, display, flexDirection, flexGrow, fontFamily, fontSize, fontWeight, gap, height, justifyContent, justifySelf, marginBlock, marginBottom, marginRight, objectFit, objectPosition, overflow, padding, paddingBottom, paddingInline, percentage, px, ratio, rem, textTransform, width } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, knockoutColor, knockoutContrastColor, pageGutter, pageSpacing, primaryColor, radius, runningNumberFont, tagFont } from "../../index.style";
import { boxed } from "../../shared/boxed";
import { collection, collectionItem } from "../../shared/collection";
import { clickable } from "../interaction";

export const railcarCollectionStyle = () => child('ui-railcars') (
	collection(rem(16)),

	child('ui-railcar') (
		collectionItem(),

		display('flex'),
		flexDirection('column'),
		height(percentage(100)),

		border(px(1), 'solid', primaryColor),
		borderRadius(radius),
		overflow('hidden'),

		clickable(),

		child('img') (
			width(percentage(100)),
			aspectRatio(captureAspectRatio),
			backgroundColor(captureBackgroundColor),

			objectFit('cover'),
			objectPosition('left')
		),

		child('ui-header') (
			flexGrow(1),

			display('flex'),
			justifyContent('space-between'),
			gap(rem(0.5)),
			padding(pageGutter),

			marginBlock(pageGutter.divide(2)),

			child('ui-name') (
				fontSize(rem(1.2)),

				overflow('hidden')
			),

			child('ui-tag') (
				fontFamily(tagFont)
			)
		),

		child('ui-tagline') (
			display('flex'),
			alignItems('center'),
			gap(pageGutter),
			paddingInline(pageGutter),
			paddingBottom(pageGutter),

			child('ui-running-number') (
				display('block'),
				marginRight('auto'),

				fontFamily(runningNumberFont),
				fontSize(rem(0.8))
			),

			child('ui-tag') (
				padding(rem(0.1), rem(0.25)),

				color(knockoutContrastColor),
				backgroundColor(knockoutColor),
				fontSize(rem(0.6)),
				textTransform('uppercase')
			)
		)
	)
)
