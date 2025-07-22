import { root, child, padding, margin, display, position, top, backgroundColor, color, fontSize, rem, fontFamily, borderBottom, px, paddingBlock, paddingInline } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor, primaryContrastColor } from "./index.style";
import { boxed } from "./shared/boxed";
import { railcarStyle } from "./railcar/index.style";
import { displayFont, monospacedFont } from "./assets/font";
import { iconFont, icons } from "./assets/icons/managed";
import { companyStyle } from "./company/index.style";
import { storageContainerStyle } from "./storage-container/index.style";
import { graffitiStyle } from "./graffiti/index.style";

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
			graffitiStyle(),
			storageContainerStyle(),

			display('block'),

			child('ui-navigation',
				position('sticky'),
				top(0),

				display('block'),

				color(pageContrastColor),
				backgroundColor(pageColor),

				borderBottom(px(2), 'solid', primaryColor),

				child('ui-content',
					boxed(),

					paddingBlock(pageGutter),
					paddingInline(pageSpacing),

					fontSize(rem(1.5))
				)
			)
		)
	)
);
