import { alignItems, backgroundColor, borderRadius, child, color, display, flexDirection, flexWrap, fontSize, fontWeight, gap, height, justifyContent, margin, marginBlock, marginBottom, marginTop, maxHeight, maxWidth, minHeight, objectFit, objectPosition, padding, paddingBlock, paddingInline, percentage, rem, vh, vw, width } from "@acryps/style";
import { graffitiStyle } from "./graffiti/index.style";
import { boxed } from "../shared/boxed";
import { graffitiInspirationsStyle } from "./inspirations/index.style";
import { captureBackgroundColor, pageColor, pageContrastColor, pageGutter, pageSpacing, radius } from "../index.style";
import { clickable } from "../shared/interaction";

export const graffitisStyle = () => child('ui-graffitis')(
	graffitiStyle(),
	graffitiInspirationsStyle(),

	boxed(),
	padding(pageSpacing),

	child('ui-overview')(
		display('block'),

		child('ui-hint')(
			display('block'),
			marginBottom(pageSpacing)
		),

		child('ui-section')(
			display('block'),
			marginBlock(pageSpacing.multiply(2)),

			child('ui-title')(
				display('block'),

				fontSize(rem(1.5)),
				fontWeight('bold')
			),

			child('ui-hint')(
				display('block'),
				marginBottom(pageGutter)
			),

			child('ui-artists')(
				display('flex'),
				flexWrap('wrap'),
				alignItems('center'),
				gap(pageGutter),

				marginBlock(pageGutter.divide(2)),

				child('ui-artist')(
					child('img')(
						height(rem(1.75))
					),

					child('ui-name')(
						display('block'),
						padding(rem(0.25), rem(0.75)),

						color(pageColor),
						backgroundColor(pageContrastColor)
					)
				)
			),

			child('ui-graffitis')(
				display('block'),

				child('ui-date')(
					display('block'),
					marginBottom(pageGutter),

					fontWeight('bold')
				),

				child('ui-graffiti')(
					display('flex'),
					flexDirection('column'),
					alignItems('flex-start'),
					marginBottom(pageSpacing),

					child('img')(
						display('block'),
						maxHeight(vh(25)),
						maxWidth(percentage(100)),
						minHeight(rem(3)),

						objectFit('contain'),
						objectPosition('left'),

						borderRadius(radius),
						backgroundColor(captureBackgroundColor)
					),

					child('ui-detail')(
						display('flex'),
						alignItems('center'),
						flexWrap('wrap'),
						gap(rem(0.75)),

						marginTop(rem(0.25)),

						child('ui-name')(
							fontWeight('bold')
						)
					)
				)
			),

			child('ui-more') (
				display('flex'),
				alignItems('center'),
				gap(rem(0.75)),
				marginTop(pageSpacing),

				clickable()
			)
		)
	)
);
