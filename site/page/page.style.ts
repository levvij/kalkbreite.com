import { root, child, padding, margin, display, position, top, backgroundColor, color, fontSize, rem, fontFamily, borderBottom, px, paddingBlock, paddingInline, flexGrow, alignItems, zIndex, boxShadow, hex, descendant, marginRight, lineHeight, percentage, maxWidth, marginInline } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor, primaryContrastColor } from "./index.style";
import { boxed, maximumBoxedWidth } from "./shared/boxed";
import { railcarsStyle, railcarStyle } from "./railcar/index.style";
import { displayFont, monospacedFont } from "./assets/font";
import { companyStyle } from "./company/index.style";
import { storageContainerStyle } from "./storage-container/index.style";
import { graffitiStyle } from "./graffiti/index.style";
import { artistStyle } from "./artist/index.style";
import { buttonStyle } from "./shared/button";
import { clickable } from "./shared/interaction";
import { loginStyle } from "./login/index.style";
import { trainStyle } from "./trains/train/index.style";
import { layoutPageStyle } from "./layout/index.style";
import { trainsStyle } from "./trains/index.style";
import { railcarModelStyle } from "./model/index.style";
import { iconFont, icons } from "./.built/icons";
import { artistsStyle } from "./artists/index.style";
import { liveStyle } from "./live/index.style";
import { graffitiInspirationsStyle } from "./graffiti-inspirations/index.style";

export const applicationStyle = () => root() (
	monospacedFont,
	displayFont,

	iconFont,
	icons(),

	child('body') (
		padding(0),
		margin(0),

		color(pageContrastColor),
		backgroundColor(pageColor),
		fontFamily(displayFont.name),

		child('ui-page') (
			homeStyle(),
			loginStyle(),
			trainsStyle(),
			artistStyle(),
			artistsStyle(),
			railcarsStyle(),
			companyStyle(),
			graffitiStyle(),
			graffitiInspirationsStyle(),
			storageContainerStyle(),
			railcarModelStyle(),
			layoutPageStyle(),
			liveStyle(),

			display('block'),

			child('ui-navigation') (
				position('sticky'),
				top(0),
				zIndex(2),

				display('block'),

				color(pageContrastColor),
				backgroundColor(pageColor),

				boxShadow(hex('0002'), 0, 0, rem(1)),

				child('ui-content') (
					boxed(),
					lineHeight(1),

					display('flex'),
					alignItems('center'),
					paddingBlock(pageGutter),
					paddingInline(pageSpacing),

					child('ui-logo') (
						flexGrow(1),

						fontSize(rem(1.5))
					),

					child('ui-login') (
						clickable()
					)
				)
			),

			child('ui-breadcrumb') (
				position('sticky'),
				top(rem(1.5).add(pageGutter.multiply(2)).subtract(rem(1).subtract(pageGutter.divide(2))).add(px(1))),
				zIndex(1),

				display('block'),
				paddingInline(pageSpacing),
				paddingBlock(pageGutter.divide(4)),
				lineHeight(1),

				color(primaryContrastColor),
				backgroundColor(primaryColor),

				child('ui-container') (
					display('block'),
					maxWidth(maximumBoxedWidth),
					marginInline('auto'),

					descendant('ui-layer') (
						display('flex'),

						child('ui-name') (
							marginRight(pageSpacing),

							clickable()
						)
					)
				)
			)
		)
	)
);
