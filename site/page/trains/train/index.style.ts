import { alignItems, aspectRatio, background, backgroundColor, backgroundImage, border, borderColor, boxShadow, child, color, colorStop, display, flexDirection, flexGrow, flexWrap, fontFamily, fontSize, fontWeight, gap, height, hover, justifyContent, left, linearGradient, marginBlock, marginBottom, marginInline, marginLeft, marginRight, marginTop, overflowInline, overflowX, padding, paddingBlock, paddingInline, percentage, position, px, Ratio, rem, rotate, top, transform, transformOrigin, turn, Variable, width, zIndex } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { captureBackgroundColor, pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor, runningNumberFont, tagFont } from "../../index.style";
import { trainIdentifierFont } from "../../assets/font";
import { clickable } from "../../shared/interaction";
import { coupleStyle } from "./couple/index.style";
import { detailSectionStyle } from "../../shared/detail-section/index.style";
import { layoutStyle } from "../../shared/layout/index.style";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";
import { trainLabelStyle } from "../../shared/train-label/index.style";
import { assignTrainLabelStyle } from "./label/index.style";

const iconButtonTextSize = rem(1);
const iconButtonSize = iconButtonTextSize.add(pageGutter.multiply(2));
const imageWidth = rem(8);

export const imageRatio = new Variable<Number>('image-ratio');

export const trainStyle = () => child('ui-train')(
	display('block'),

	coupleStyle(),
	assignTrainLabelStyle(),

	child('ui-label') (
		display('block'),
		marginBottom(pageSpacing),

		trainLabelStyle(rem(1.75))
	),

	detailSectionStyle(
		marginBottom(pageSpacing.multiply(2)),

		child('ui-identifier') (
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(2)),
			trainIdentifierFont
		)
	),

	child('ui-actions') (
		buttonGroupStyle(),
		marginBottom(pageSpacing),

		child('ui-action') (
			buttonStyle()
		)
	),

	child('ui-units') (
		display('block'),

		marginBlock(pageSpacing.add(iconButtonSize.divide(2))),

		child('ui-unit') (
			display('flex'),
			height(imageWidth.multiply(imageRatio)),
			position('relative'),

			clickable(),

			child('img') (
				position('absolute'),
				top(0),
				left(imageWidth),

				height(imageWidth),

				transform(rotate(turn(0.25))),
				transformOrigin('left', 'top'),

				backgroundColor(captureBackgroundColor),
				backgroundImage(
					linearGradient(turn(0.125),
						colorStop(percentage(50).subtract(px(1)), 'transparent'),
						colorStop(percentage(50).subtract(px(1)), pageContrastColor),
						colorStop(percentage(50).add(px(1)), pageContrastColor),
						colorStop(percentage(50).add(px(1)), 'transparent')
					),
					linearGradient(turn(-0.125),
						colorStop(percentage(50).subtract(px(1)), 'transparent'),
						colorStop(percentage(50).subtract(px(1)), pageContrastColor),
						colorStop(percentage(50).add(px(1)), pageContrastColor),
						colorStop(percentage(50).add(px(1)), 'transparent')
					)
				)
			),

			child('ui-detail') (
				flexGrow(1),

				display('block'),
				padding(pageGutter),
				marginLeft(imageWidth.add(pageSpacing.subtract(pageGutter))),

				detailSectionStyle(
					child('ui-header') (
						fontSize(rem(1.25)),

						child('ui-tag') (
							display('inline-block'),
							marginRight(pageGutter),

							fontFamily(tagFont)
						)
					)
				)
			)
		),

		child('ui-action') (
			display('flex'),
			marginBlock(iconButtonSize.divide(2).invert()),
			marginLeft(imageWidth.divide(2).subtract(iconButtonSize.divide(2))),
			width(iconButtonSize.subtract(pageGutter.multiply(2))),
			padding(pageGutter.subtract(px(1))),

			position('relative'),
			zIndex(2),

			clickable(),
			fontSize(iconButtonTextSize),
			backgroundColor(pageColor),
			border(px(1), 'solid', pageContrastColor),

			transform(rotate(turn(0.25))),

			hover() (
				color(pageColor),
				backgroundColor(pageContrastColor),
				borderColor(pageColor)
			)
		)
	),

	layoutStyle()
);
