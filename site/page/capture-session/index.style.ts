import { alignItems, backdropFilter, backgroundColor, before, blur, child, content, display, flexDirection, gap, height, hex, insetBlock, invert, Invert, justifyContent, left, marginBlock, MarginBlockGlobalStyleProperty, marginBottom, marginInline, marginLeft, marginTop, overflowX, padding, paddingInline, percentage, pointerEvents, position, px, rem, top, transform, translate, userSelect, width } from "@acryps/style";
import { boxed, boxedOversize, boxedOversizeInverse } from "../shared/boxed";
import { pageGutter, pageSpacing } from "../index.style";
import { buttonGroupStyle, buttonStyle } from "../shared/button";
import { bufferAnchorOffset } from "../railcar/railcar/index.style";
import { captureSessionAssignStyle } from "./assign/index.style";

export const captureSessionStyle = () => child('ui-capture-sessions') (
	boxed(),

	captureSessionAssignStyle(),

	child('ui-overview') (
		display('block'),

		child('ui-hint') (
			display('block'),
			padding(pageSpacing)
		),

		child('ui-sessions') (
			display('flex'),
			flexDirection('column'),
			gap(pageSpacing),

			child('ui-capture-session') (
				display('block'),

				child('ui-timestamp') (
					display('block'),
					paddingInline(pageSpacing),
					marginBottom(pageGutter.divide(2)),
				),

				child('ui-image') (
					display('flex'),
					marginInline(boxedOversize),
					paddingInline(boxedOversizeInverse),

					overflowX('scroll'),

					child('ui-container') (
						display('block'),
						position('relative'),

						child('img') (
							height(rem(10)),
							userSelect('none')
						),

						child('ui-marker') (
							position('absolute'),
							left(percentage(100).multiply(bufferAnchorOffset)),
							insetBlock(0),

							display('block'),
							width(px(1)),
							marginLeft(px(-0.5)),

							backdropFilter(invert(1), blur(px(5))),

							child('ui-action') (
								position('absolute'),
								top(pageGutter.divide(2)),

								transform(translate(percentage(-50))),

								buttonStyle()
							)
						)
					)
				),

				child('ui-actions') (
					marginTop(pageGutter.divide(2)),
					marginInline(pageSpacing),

					buttonGroupStyle(),

					child('ui-action') (
						buttonStyle()
					)
				)
			)
		)
	)
);
