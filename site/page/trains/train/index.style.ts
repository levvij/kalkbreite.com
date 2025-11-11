import { alignItems, background, backgroundColor, backgroundImage, border, borderBlock, borderColor, borderLeft, borderRight, boxShadow, child, color, colorStop, display, firstChild, flexDirection, flexWrap, fontFamily, fontSize, fontWeight, gap, height, hover, justifyContent, lastChild, linearGradient, marginBottom, marginInline, marginRight, marginTop, overflowInline, overflowX, padding, paddingBlock, paddingInline, percentage, position, px, rem, turn } from "@acryps/style";
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
const imageHeight = rem(4);

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
		display('flex'),
		alignItems('flex-start'),
		gap(pageGutter, 0),
		flexWrap('wrap'),

		marginBottom(pageSpacing),

		child('ui-unit') (
			display('flex'),
			flexDirection('column'),

			clickable(),

			child('img') (
				height(imageHeight),
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
				display('flex'),
				gap(rem(1)),

				child('ui-tag') (
					fontFamily(tagFont)
				)
			)
		),

		child('ui-action') (
			display('flex'),
			alignItems('center'),

			height(imageHeight.subtract(px(2))),
			paddingInline(pageGutter.divide(2).subtract(px(1))),

			position('relative'),

			clickable(),
			fontSize(iconButtonTextSize),
			backgroundColor(pageColor),
			borderBlock(px(1), 'solid', pageContrastColor),

			firstChild() (
				borderLeft(px(1), 'solid', pageContrastColor)
			),

			lastChild() (
				borderRight(px(1), 'solid', pageContrastColor)
			),

			hover() (
				color(pageColor),
				backgroundColor(pageContrastColor),
				borderColor(pageColor)
			)
		)
	),

	layoutStyle()
);
