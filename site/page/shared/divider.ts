import { border, borderBottom, hex, marginBottom, paddingBottom, px } from "@acryps/style";
import { pageSpacing } from "../index.style";

export const endDivider = () => [
	marginBottom(pageSpacing),
	paddingBottom(pageSpacing),

	borderBottom(px(1), 'dashed', hex('0004'))
]
