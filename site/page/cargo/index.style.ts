import { alignItems, aspectRatio, attribute, backgroundColor, border, borderRadius, boxShadow, child, color, containerName, cqh, display, flexDirection, flexGrow, FlexGrowGlobalStyleProperty, fontFamily, fontSize, fontStyle, height, hex, hover, insetBlock, justifyContent, left, margin, marginBlock, marginBottom, marginTop, padding, percentage, position, px, rem, right, top, width } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { pageContrastColor, pageGutter, pageSpacing, primaryColor, primaryContrastColor, radius } from "../index.style";
import { collection, collectionItem } from "../shared/collection";
import { cargoHeight, cargoLoadColor, cargoLoadLogoColor } from "../railcar/railcar/index.style";
import { cargoLoadIdentifierFont } from "../assets/font";
import { clickable } from "../shared/interaction";
import { cargoOffset } from "../model/index.style";
import { cargoLoadIdentifierStyle } from "../shared/cargo-load-identifier/index.style";
import { loadStyle } from "./load/index.style";

export const cargoStyle = () => child('ui-cargo') (
	boxed(),
	padding(pageSpacing),

	loadStyle(),

	child('ui-overview') (
		display('block'),

		child('ui-hint') (
			display('block'),
			marginBottom(pageSpacing)
		),

		child('ui-loads') (
			collection(rem(20)),

			child('ui-load') (
				collectionItem(),
				clickable(),

				display('flex'),
				flexDirection('column'),
				padding(pageGutter),

				border(px(1), 'solid', primaryColor),
				borderRadius(radius),

				previewStyle(),

				child('ui-detail') (
					display('block'),
					marginBlock(pageGutter),

					cargoLoadIdentifierStyle(),

					child('ui-name') (
						display('block')
					)
				),

				child('ui-railcar') (
					display('flex'),
					alignItems('center'),
					justifyContent('space-between'),

					padding(pageGutter),
					margin(pageGutter.invert()),
					marginTop('auto'),

					clickable(),

					hover() (
						color(primaryContrastColor),
						backgroundColor(primaryColor)
					)
				),

				child('ui-idle') (
					marginTop('auto'),

					fontStyle('italic')
				)
			)
		)
	)
)

export const previewStyle = () => child('ui-preview') (
	display('flex'),
	justifyContent('center'),
	alignItems('center'),
	position('relative'),

	width(percentage(100)),
	aspectRatio(cargoHeight as any),

	color(cargoLoadLogoColor),
	backgroundColor(cargoLoadColor),
	boxShadow(pageContrastColor, 0, 0, 0, px(1), 'inset'),

	child('ui-logo') (
		display('block'),
		width(percentage(50)),
		height(percentage(50)),

		backgroundColor(cargoLoadLogoColor)
	),

	child('ui-identifier') (
		position('absolute'),
		top(pageGutter),
		left(pageGutter),

		cargoLoadIdentifierStyle()
	),

	child('ui-oversize') (
		position('absolute'),
		insetBlock(0),

		width(px(1)),
		backgroundColor(hex('0002')),

		attribute('ui-side', 'head')(left(cargoOffset)),
		attribute('ui-side', 'tail')(right(cargoOffset))
	)
);
