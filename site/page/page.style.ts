import { root, child, padding, margin, display, position, top, backgroundColor, color, fontSize, rem, fontFamily, borderBottom, px, paddingBlock, paddingInline, flexGrow, alignItems, zIndex, boxShadow, hex } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor, primaryContrastColor } from "./index.style";
import { boxed } from "./shared/boxed";
import { railcarStyle } from "./railcar/index.style";
import { displayFont, monospacedFont } from "./assets/font";
import { iconFont, icons } from "./assets/icons/managed";
import { companyStyle } from "./company/index.style";
import { storageContainerStyle } from "./storage-container/index.style";
import { graffitiStyle } from "./graffiti/index.style";
import { artistStyle } from "./artist/index.style";
import { buttonStyle } from "./shared/button";
import { clickable } from "./shared/interaction";
import { loginStyle } from "./login/index.style";
import { trainStyle } from "./trains/train/index.style";
import { layoutStyle } from "./layout/index.style";
import { trainsStyle } from "./trains/index.style";

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
			loginStyle(),
			trainsStyle(),
			artistStyle(),
			railcarStyle(),
			companyStyle(),
			graffitiStyle(),
			storageContainerStyle(),
			layoutStyle(),

			display('block'),

			child('ui-navigation',
				position('sticky'),
				top(0),
				zIndex(1),

				display('block'),

				color(pageContrastColor),
				backgroundColor(pageColor),

				borderBottom(px(2), 'solid', primaryColor),
				boxShadow(hex('0002'), 0, 0, rem(1)),

				child('ui-content',
					boxed(),

					display('flex'),
					alignItems('center'),
					paddingBlock(pageGutter),
					paddingInline(pageSpacing),

					child('ui-logo',
						flexGrow(1),

						fontSize(rem(1.5))
					),

					child('ui-login',
						clickable()
					)
				)
			)
		)
	)
);
