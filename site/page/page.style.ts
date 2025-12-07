import { root, child, padding, margin, display, position, top, backgroundColor, color, fontSize, rem, fontFamily, borderBottom, px, paddingBlock, paddingInline, flexGrow, alignItems, zIndex, boxShadow, hex, descendant, marginRight, lineHeight, percentage, maxWidth, marginInline, insetInline, after, content, inset, backdropFilter, grayscale, before, empty, blur, seconds, brightness, contrast, gap, paddingRight } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { pageColor, pageContrastColor, pageGutter, pageSpacing, primaryColor, primaryContrastColor } from "./index.style";
import { boxed, maximumBoxedWidth } from "./shared/boxed";
import { railcarsStyle } from "./railcar/index.style";
import { displayFont, monospacedFont } from "./assets/font";
import { companyStyle } from "./company/index.style";
import { storageContainerStyle } from "./storage-container/index.style";
import { graffitisStyle } from "./graffiti/index.style";
import { buttonStyle } from "./shared/button";
import { clickable } from "./shared/interaction";
import { loginStyle } from "./login/index.style";
import { trainStyle } from "./trains/train/index.style";
import { layoutPageStyle } from "./layout/index.style";
import { trainsStyle } from "./trains/index.style";
import { railcarModelStyle } from "./model/index.style";
import { iconFont, icons } from "./.built/icons";
import { artistsStyle } from "./artist/index.style";
import { liveStyle } from "./live/index.style";
import { searchStyle } from "./shared/search/index.style";

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
			artistsStyle(),
			railcarsStyle(),
			companyStyle(),
			graffitisStyle(),
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
					paddingInline(pageSpacing.divide(2)),

					child('ui-logo') (
						flexGrow(1),

						paddingBlock(pageSpacing.divide(2)),
						paddingRight(pageGutter),

						fontSize(rem(1.5))
					),

					child('ui-login') (
						clickable(),

						display('flex'),
						alignItems('center'),
						paddingInline(pageSpacing.divide(2)),
					),

					child('ui-account') (
						display('flex'),
						alignItems('center'),
						paddingInline(pageSpacing.divide(2)),
					),

					child('ui-action') (
						clickable(),

						display('flex'),
						alignItems('center'),
						paddingInline(pageSpacing.divide(2)),

						fontSize(rem(1.25))
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
			),

			child('ui-global-search') (
				position('fixed'),
				insetInline(pageSpacing),
				top(percentage(30)),
				zIndex(2000),

				display('flex'),
				alignItems('center'),

				fontSize(rem(1.5)),

				empty() (
					display('none')
				),

				before() (
					content(''),

					position('fixed'),
					inset(0),
					zIndex(-1),

					backdropFilter(
						contrast(0.5),
						brightness(1.5),
						blur(px(2))
					)
				),

				searchStyle(
					flexGrow(1),
					maxWidth(rem(40)),

					boxShadow(hex('0006'), 0, rem(0.5), rem(2))
				)
			)
		)
	)
);
