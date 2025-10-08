import { child, display, fileSelectorButton, flexDirection, fontSize, gap, justifyContent, marginBottom, marginRight, opacity, padding, paddingInline, rem, textDecorationLine } from "@acryps/style";
import { pageGutter, pageSpacing } from "../../index.style";
import { districtIdentifierFont, monospacedFont, sectionIdentifierFont } from "../../assets/font";
import { detailSectionStyle } from "../../shared/detail-section/index.style";
import { clickable } from "../../shared/interaction";
import { layoutStyle } from "../../shared/layout/index.style";

export const sectionStyle = () => child('ui-section') (
	display('block'),
	padding(pageSpacing),

	layoutStyle(),

	child('ui-hierarchy') (
		display('block'),
		marginBottom(pageGutter),

		districtIdentifierFont,

		child('ui-district') (
			marginRight(pageSpacing)
		)
	),

	detailSectionStyle(
		child('ui-name') (
			display('block'),

			fontSize(rem(2)),
			sectionIdentifierFont
		),
	)
);
