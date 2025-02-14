import { root, child, padding, margin, display, position, top, backgroundColor, color, fontSize, rem, fontFamily } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { pageColor, pageContrastColor, pageSpacing } from "./index.style";
import { boxed } from "./shared/boxed";
import { railcarStyle } from "./railcar/index.style";
import { displayFont, monospacedFont } from "./assets/font";
import { iconFont, icons } from "./assets/icons/managed";
import { companyStyle } from "./company/index.style";

export const applicationStyle = () => root(
	monospacedFont,
	displayFont,

	iconFont,
	icons(),

	child('body',
		padding(0),
		margin(0),

		color(pageContrastColor),
		backgroundColor(pageColor),
		fontFamily(displayFont.name),

		child('ui-page',
			homeStyle(),
			railcarStyle(),
			companyStyle(),

			display('block'),

			child('ui-navigation',
				position('sticky'),
				top(0),

				boxed(),

				padding(pageSpacing),

				fontSize(rem(1.5)),
				backgroundColor(pageColor)
			)
		)
	)
);
