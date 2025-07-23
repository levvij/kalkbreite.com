import { alignItems, aspectRatio, backgroundColor, border, borderRadius, child, color, display, flexDirection, flexGrow, fontFamily, fontSize, fontWeight, gap, height, justifyContent, justifySelf, marginBlock, marginBottom, objectFit, overflow, padding, paddingBottom, paddingInline, percentage, px, ratio, rem, width } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, pageGutter, pageSpacing, primaryColor, radius, runningNumberFont, tagFont } from "../../index.style";
import { boxed } from "../../shared/boxed";
import { collection, collectionItem } from "../../shared/collection";
import { graffitiPreviewStyle } from "../graffiti-preview/index.style";
import { clickable } from "../interaction";

export const graffitiCollectionStyle = (...extras) => child('ui-graffitis',
	collection(rem(16)),

	extras,

	child('ui-graffiti',
		collectionItem(),

		display('flex'),
		flexDirection('column'),
		height(percentage(100)),

		border(px(1), 'solid', primaryColor),
		borderRadius(radius),
		overflow('hidden'),

		clickable(),

		graffitiPreviewStyle(),

		child('ui-artist',
			display('block'),
			padding(pageGutter)
		),

		child('ui-name',
			paddingInline(pageGutter),
			paddingBottom(pageGutter),

			fontSize(rem(0.8)),
			overflow('hidden')
		)
	)
)
