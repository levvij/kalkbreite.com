import { alignItems, aspectRatio, background, backgroundColor, border, borderRadius, child, color, display, em, flexDirection, flexGrow, fontFamily, fontSize, fontWeight, gap, height, justifyContent, justifySelf, lineHeight, LineHeightGlobalStyleProperty, marginBlock, marginBottom, marginLeft, MarginLeftGlobalStyleProperty, marginRight, marginTop, maxHeight, maxWidth, objectFit, objectPosition, overflow, padding, paddingBottom, paddingInline, percentage, position, px, ratio, rem, rotate, scale, Scale, textTransform, transform, width, zIndex } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, captureRotation, knockoutColor, knockoutContrastColor, pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor, radius, runningNumberFont, tagFont } from "../../index.style";
import { boxed } from "../../shared/boxed";
import { collection, collectionItem } from "../../shared/collection";
import { clickable } from "../interaction";

export const railcarCollectionStyle = () => child('ui-railcars') (
	collection(rem(20)),

	child('ui-railcar') (
		collectionItem(),

		display('flex'),
		flexDirection('column'),
		height(percentage(100)),

		overflow('hidden'),
		backgroundColor(captureBackgroundColor),
		borderRadius(radius),

		clickable(),

		child('ui-header') (
			flexGrow(1),

			position('relative'),
			zIndex(1),

			display('flex'),
			alignItems('flex-start'),
			justifyContent('space-between'),
			gap(rem(0.5)),
			padding(pageGutter),

			marginTop(pageGutter.divide(2)),
			marginBottom(rem(-0.5)),

			child('ui-name') (
				height(em(2)),
				maxWidth(percentage(60)),
				overflow('hidden'),

				fontSize(rem(2)),
				lineHeight(1)
			),

			child('ui-tag') (
				padding(em(0.125), em(0.25)),

				fontFamily(tagFont),
				fontSize(rem(0.8)),
				color(pageContrastColor),
				backgroundColor(pageColor),
				border(px(1), 'solid', pageContrastColor)
			)
		),

		child('img') (
			width(percentage(100)),
			maxHeight(rem(10)),
			backgroundColor(captureBackgroundColor),

			transform(rotate(captureRotation), scale(1.2)),

			objectFit('cover'),
			objectPosition('left')
		),

		child('ui-tagline') (
			display('flex'),
			alignItems('center'),
			justifyContent('flex-end'),
			gap(pageGutter),
			paddingInline(pageGutter),
			paddingBottom(pageGutter),
			marginTop(rem(2)),

			child('ui-running-number') (
				display('block'),
				marginLeft('auto'),

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
