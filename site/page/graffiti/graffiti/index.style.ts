import { aspectRatio, backgroundColor, border, borderRadius, child, color, display, filter, flexDirection, fontSize, fontWeight, height, invert, marginBottom, marginTop, maxHeight, objectFit, objectPosition, overflow, padding, paddingBlock, paddingInline, percentage, px, rad, ratio, rem, vh, width } from "@acryps/style";
import { assignGraffitiInspirationStyle } from "./assign-inspiration/index.style";
import { pageSpacing, pageGutter, radius, primaryColor, captureAspectRatio, captureBackgroundColor } from "../../index.style";
import { boxed } from "../../shared/boxed";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";
import { collection, collectionItem } from "../../shared/collection";
import { detailSectionStyle } from "../../shared/detail-section/index.style";
import { endDivider } from "../../shared/divider";
import { clickable } from "../../shared/interaction";
import { slideshowStyle } from "../../shared/slideshow/index.style";
import { assignStyle } from "./assign/index.style";

export const graffitiStyle = () => child('ui-graffiti') (
	assignStyle(),
	assignGraffitiInspirationStyle(),

	slideshowStyle(),

	child('ui-detail') (
		display('block'),
		padding(pageSpacing),

		child('ui-actions') (
			buttonGroupStyle(),
			marginBottom(pageSpacing),

			child('ui-action') (
				buttonStyle()
			)
		),

		child('ui-name') (
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(1.5)),
			fontWeight('bold')
		),

		child('ui-description') (
			display('block'),
			marginBottom(pageSpacing)
		),

		detailSectionStyle(
			endDivider(),

			child('ui-artist') (
				clickable(),

				child('img') (
					height(rem(3))
				),

				child('ui-name') (
					fontSize(rem(2))
				),

				child('ui-summary') (
					display('block'),
					marginTop(rem(0.5))
				)
			)
		),

		child('ui-crosses') (
			display('block'),

			endDivider()
		),

		child('ui-inspiration') (
			display('block'),

			endDivider(),

			child('img') (
				width(percentage(100)),
				maxHeight(vh(40)),

				objectFit('cover'),
				borderRadius(radius)
			)
		),

		child('ui-captures') (
			collection(rem(15)),

			child('ui-capture') (
				collectionItem(),

				display('flex'),
				flexDirection('column'),
				height(percentage(100)),

				border(px(1), 'solid', primaryColor),
				borderRadius(radius),
				overflow('hidden'),

				child('img') (
					width(percentage(100)),
					aspectRatio(captureAspectRatio),
					backgroundColor(captureBackgroundColor),

					objectFit('contain')
				),

				child('ui-detail') (
					paddingInline(pageSpacing),
					paddingBlock(pageSpacing.divide(2)),

					child('ui-actions') (
						buttonGroupStyle(),
						marginTop(pageSpacing.divide(2)),

						child('ui-action') (
							buttonStyle()
						)
					)
				)
			)
		)
	)
);
