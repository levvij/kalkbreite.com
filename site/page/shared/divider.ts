import { border, borderBottom, borderTop, hex, marginBottom, marginTop, paddingBottom, paddingTop, px } from "@acryps/style";
import { pageSpacing } from "../index.style";

export const endDivider = () => [
	marginBottom(pageSpacing),
	paddingBottom(pageSpacing),

	borderBottom(px(1), 'dashed', hex('0004'))
]

export const startDivider = () => [
	marginTop(pageSpacing),
	paddingTop(pageSpacing),

	borderTop(px(1), 'dashed', hex('0004'))
]
