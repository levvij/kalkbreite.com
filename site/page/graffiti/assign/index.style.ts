import { backgroundColor, borderBottom, borderLeft, borderRight, borderTop, bottom, child, display, hex, inset, insetBlock, insetInline, left, margin, marginBlock, marginBottom, marginInline, marginTop, percentage, position, px, rem, Rem, right, top, userSelect, width } from "@acryps/style";
import { pageSpacing } from "../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../shared/button";
import { boxed } from "../../shared/boxed";
import { cropStyle } from "../../shared/crop/index.style";

export const assignStyle = () => child('ui-assign',
	boxed(),

	cropStyle(),

	child('canvas',
		width(percentage(100))
	),

	child('ui-actions',
		buttonGroupStyle(),
		marginTop(pageSpacing),

		child('ui-action',
			buttonStyle()
		)
	)
);
