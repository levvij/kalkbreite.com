import { child, display, fontSize, marginBottom, marginTop, rem } from "@acryps/style";
import { boxed } from "../../shared/boxed";
import { layoutStyle } from "../../shared/layout/index.style";
import { detailSectionStyle } from "../../shared/detail-section/index.style";
import { powerDistrictIdentifierFont, sectionIdentifierFont } from "../../assets/font";
import { pageGutter, pageSpacing } from "../../index.style";
import { clickable } from "../../shared/interaction";

export const powerDistrictStyle = () => child('ui-power-district')(
	boxed(),

	layoutStyle(),

	detailSectionStyle(
		marginTop(pageSpacing),

		child('ui-district') (
			child('ui-name') (
				display('block'),
				marginBottom(pageGutter),

				fontSize(rem(2)),
				powerDistrictIdentifierFont
			),

			child('ui-sections') (
				display('block'),

				child('ui-section') (
					display('block'),

					clickable()
				)
			)
		)
	)
);
