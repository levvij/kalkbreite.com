import { alignItems, background, backgroundColor, backgroundImage, border, borderColor, boxShadow, child, color, colorStop, display, flexDirection, flexWrap, fontSize, fontWeight, gap, height, hover, linearGradient, marginBottom, marginInline, marginTop, overflowInline, overflowX, padding, paddingBlock, paddingInline, percentage, position, px, rem, turn } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { captureBackgroundColor, pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor } from "../../index.style";
import { trainIdentifierFont } from "../../assets/font";
import { clickable } from "../../shared/interaction";
import { coupleStyle } from "./couple/index.style";

const iconButtonTextSize = rem(1);
const iconButtonSize = iconButtonTextSize.add(pageGutter.multiply(2));
const imageHeight = rem(8);

export const trainStyle = () => child('ui-train')(
	display('block'),

	coupleStyle(),

	child('ui-identifier')(
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2)),
		trainIdentifierFont
	),

	child('ui-units') (
		display('flex'),
		alignItems('flex-start'),
		paddingInline(iconButtonSize.divide(2)),

		overflowX('scroll'),

		child('ui-unit') (
			display('flex'),
			flexDirection('column'),

			clickable(),

			child('img')(
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
			)
		),

		child('ui-action') (
			display('flex'),
			marginInline(iconButtonSize.divide(2).invert()),
			marginTop(imageHeight.divide(2).subtract(iconButtonSize.divide(2))),
			padding(pageGutter.subtract(px(1))),
			position('relative'),

			clickable(),
			fontSize(iconButtonTextSize),
			backgroundColor(pageColor),
			border(px(1), 'solid', pageContrastColor),

			hover() (
				color(pageColor),
				backgroundColor(pageContrastColor),
				borderColor(pageColor)
			)
		)
	)
);
