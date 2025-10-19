import { after, alignItems, aspectRatio, backgroundColor, backgroundImage, bottom, boxShadow, child, color, colorStop, content, display, flexDirection, flexGrow, fontFamily, fontSize, fontStyle, fontWeight, height, hover, inset, insetInline, justifyContent, justifySelf, linearGradient, margin, marginBlock, marginBottom, marginInline, marginTop, maxWidth, objectFit, outline, padding, paddingInline, percentage, position, px, ratio, rem, textAlign, top, vh, width, zIndex } from "@acryps/style";
import { captureAspectRatio, captureBackgroundColor, knockoutColor, knockoutContrastColor, pageColor, pageGutter, pageSpacing, pageTransparentColor, primaryColor, primaryContrastColor, primaryOutlineColor, runningNumberFont, tagFont } from "../index.style";
import { boxed } from "../shared/boxed";
import { collection, collectionItem } from "../shared/collection";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { buttonGroupStyle, buttonStyle } from "../shared/button";
import { SlideshowComponent } from "../shared/slideshow";
import { slideshowStyle } from "../shared/slideshow/index.style";
import { layoutStyle } from "../shared/layout/index.style";
import { clickable } from "../shared/interaction";

const coverOverscan = percentage(-15);

export const homeStyle = () => child('ui-home') (
	boxed(),

	child('ui-header') (
		display('block'),
		padding(pageSpacing.multiply(2)),
		textAlign('center'),

		child('ui-title') (
			display('block'),
			marginBottom(pageSpacing),

			fontSize(rem(2))
		),

		child('ui-introduction') (
			display('block'),
			maxWidth(rem(40)),
			marginInline('auto')
		)
	),

	child('ui-cover') (
		display('block'),
		position('relative'),
		zIndex(-1),

		marginBlock(coverOverscan),

		child('img') (
			width(percentage(100))
		),

		after() (
			content(''),

			position('absolute'),
			inset(0),

			backgroundImage(linearGradient(0,
				colorStop(percentage(0), pageColor),
				colorStop(coverOverscan.invert().multiply(2), pageTransparentColor),
				colorStop(percentage(100).add(coverOverscan.multiply(2)), pageTransparentColor),
				colorStop(percentage(100), pageColor)
			))
		)
	),

	child('ui-topics') (
		collection(rem(20)),
		margin(pageSpacing),

		child('ui-topic') (
			collectionItem(),
			clickable(),

			display('flex'),
			flexDirection('column'),

			color(knockoutContrastColor),
			backgroundColor(knockoutColor),

			hover() (
				color(primaryContrastColor),
				backgroundColor(primaryColor)
			),

			child('img') (
				aspectRatio(ratio(16, 9)),
				width(percentage(100)),

				objectFit('cover'),
				backgroundColor(captureBackgroundColor)
			),

			child('ui-title') (
				display('block'),
				padding(pageSpacing),

				fontSize(rem(1.5))
			),

			child('ui-description') (
				display('block'),
				paddingInline(pageSpacing)
			),

			child('ui-icon') (
				display('block'),
				padding(pageSpacing),

				fontSize(rem(2)),
				textAlign('right')
			),

			child('ui-unavailable') (
				marginTop('auto'),
				padding(pageSpacing),

				fontStyle('italic')
			)
		)
	)
);
