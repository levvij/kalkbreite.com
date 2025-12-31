import { child, display, height, justifyContent, marginBottom, marginInline, marginLeft, marginRight, overflowX, padding, paddingInline, rem, vh } from "@acryps/style";
import { pageGutter, pageSpacing } from "../../index.style";
import { boxed, boxedOversize, boxedOversizeInverse } from "../../shared/boxed";
import { collection } from "../../shared/collection";

export const capturesStyle = () => child('ui-captures') (
	boxed(),

	child('ui-hint') (
		display('block'),
		marginBottom(pageSpacing),
		padding(pageSpacing),
	),

	child('ui-captures') (
		display('block'),

		child('ui-capture') (
			display('block'),
			marginBottom(pageGutter),

			child('ui-header') (
				display('flex'),
				justifyContent('space-between'),
				padding(pageGutter),

				child('ui-date') (

				),

				child('ui-direction') (

				)
			),

			child('ui-image') (
				display('block'),
				marginInline(boxedOversize),
				paddingInline(boxedOversizeInverse),

				overflowX('auto'),

				child('img') (
					height(vh(25))
				)
			)
		)
	)
)
