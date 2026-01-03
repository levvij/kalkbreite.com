import { after, backgroundColor, backgroundPositionX, backgroundSize, child, content, display, fontSize, height, insetBlock, left, marginBlock, marginInline, marginLeft, marginTop, opacity, overflow, padding, paddingInline, percentage, position, rem, right, textAlign, vw } from "@acryps/style";
import { railcarSideSelectStyle } from "../../shared/railcar-side-select/index.style";
import { pageColor, pageSpacing } from "../../index.style";
import { bufferAnchorOffset } from "../../railcar/railcar/index.style";
import { boxedOversize, boxedOversizeInverse } from "../../shared/boxed";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";

const imageHeight = rem(10);

export const captureSessionAssignStyle = () => child('ui-assign') (
	display('block'),

	child('ui-image') (
		display('block'),
		height(imageHeight),
		marginInline(boxedOversize),
		paddingInline(pageSpacing.add(boxedOversizeInverse)),

		overflow('hidden'),

		child('ui-container') (
			display('block'),
			height(percentage(100)),
			position('relative'),

			after() (
				content(''),

				position('absolute'),
				insetBlock(0),
				left(vw(-100)),
				right(percentage(100)),

				backgroundColor(pageColor),
				opacity(0.8)
			),

			child('img') (
				height(percentage(100)),
				marginLeft(imageHeight.multiply(bufferAnchorOffset).invert())
			)
		)
	),

	child('ui-form') (
		display('block'),
		padding(pageSpacing),

		child('ui-offset') (
			display('block'),
			marginBlock(pageSpacing),

			fontSize(rem(3)),
			textAlign('center')
		),

		railcarSideSelectStyle(),

		child('ui-actions') (
			buttonGroupStyle(),
			marginTop(pageSpacing),

			child('ui-action') (
				buttonStyle()
			)
		)
	)
)
