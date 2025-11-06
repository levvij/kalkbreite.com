import { after, alignItems, backgroundImage, boxSizing, child, colorStop, ColorStop, content, display, flexGrow, flexShrink, fontSize, gap, height, insetBlock, justifyContent, left, linearGradient, lineHeight, marginBottom, objectFit, objectPosition, overflow, percentage, position, rem, right, turn, width } from "@acryps/style";
import { boxed } from "../../../shared/boxed";
import { pageColor, pageGutter, pageTransparentColor } from "../../../index.style";
import { monospacedFont, trainIdentifierFont } from "../../../assets/font";

const trainHeight = rem(3);

export const coupleStyle = () => child('ui-couple') (
	boxed(),
	overflow('hidden'),

	display('flex'),
	gap(pageGutter),

	child('ui-source') (
		width(percentage(30)),
		flexShrink(0),

		display('flex'),
		justifyContent('right'),
		position('relative'),

		overflow('hidden'),

		after() (
			content(''),

			position('absolute'),
			insetBlock(0),
			left(0),
			width(rem(2)),

			backgroundImage(linearGradient(turn(0.25),
				colorStop(percentage(0), pageColor),
				colorStop(percentage(100), pageTransparentColor)
			))
		),

		child('img') (
			height(trainHeight)
		)
	),

	child('ui-icon') (
		lineHeight(trainHeight),

		fontSize(rem(1.5))
	),

	child('ui-trains') (
		flexGrow(1),

		overflow('hidden'),

		child('ui-train') (
			display('flex'),
			gap(pageGutter),
			marginBottom(pageGutter),
			width(percentage(100)),

			overflow('hidden'),

			child('ui-identifier') (
				trainIdentifierFont
			),

			child('ui-directions') (
				flexGrow(1),
				position('relative'),

				overflow('hidden'),
				fontSize(0),

				after() (
					content(''),

					position('absolute'),
					insetBlock(0),
					right(0),
					width(rem(2)),

					backgroundImage(linearGradient(turn(0.75),
						colorStop(percentage(0), pageColor),
						colorStop(percentage(100), pageTransparentColor)
					))
				),

				child('ui-direction') (
					display('flex'),
					gap(pageGutter),

					child('ui-side') (
						monospacedFont,
						fontSize(rem(1))
					),

					child('img') (
						display('block'),
						height(trainHeight),

						objectPosition('left'),
						objectFit('contain')
					)
				)
			)
		)
	)
)
