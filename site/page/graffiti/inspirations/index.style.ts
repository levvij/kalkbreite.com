import { aspectRatio, border, borderRadius, child, display, fontSize, fontWeight, marginBottom, maxHeight, objectFit, overflow, padding, percentage, px, ratio, rem, vh, width } from "@acryps/style";
import { pageGutter, pageSpacing, primaryColor, radius } from "../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";
import { collection, collectionItem } from "../../shared/collection";
import { graffitiInspirationStyle } from "./inspiration/index.style";
import { clickable } from "../../shared/interaction";

export const graffitiInspirationsStyle = () => child('ui-graffiti-inspirations') (
	padding(pageSpacing),

	graffitiInspirationStyle(),

	child('ui-actions') (
		buttonGroupStyle(),
		marginBottom(pageSpacing),

		child('ui-action') (
			buttonStyle()
		)
	),

	child('ui-section') (
		display('block'),
		marginBottom(pageSpacing),

		child('ui-title') (
			display('block'),
			marginBottom(rem(0.25)),

			fontSize(rem(1.5))
		),

		child('ui-hint') (
			display('block'),
			marginBottom(pageGutter)
		),

		child('ui-inspirations') (
			collection(rem(10)),

			child('ui-inspiration') (
				collectionItem(),

				border(px(1), 'solid', primaryColor),
				borderRadius(radius),
				overflow('hidden'),

				clickable(),

				child('ui-media') (
					display('block'),

					child('img') (
						width(percentage(100)),
						aspectRatio(ratio(1, 1)),

						objectFit('cover')
					)
				),

				child('ui-detail') (
					display('block'),
					padding(pageGutter),

					child('ui-name') (
						display('block'),
						marginBottom(rem(0.25)),

						fontWeight('bold'),
						fontSize(rem(1.2))
					)
				)
			)
		)
	)
);
