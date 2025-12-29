import { child, display, fontSize, marginTop, rem } from "@acryps/style";
import { previewStyle } from "../index.style";
import { detailSectionStyle } from "../../shared/detail-section/index.style";
import { cargoLoadIdentifierStyle } from "../../shared/cargo-load-identifier/index.style";
import { pageSpacing } from "../../index.style";

export const loadStyle = () => child('ui-load') (
	display('block'),

	previewStyle(),

	detailSectionStyle(
		marginTop(pageSpacing),

		child('ui-identifier') (
			cargoLoadIdentifierStyle(),

			fontSize(rem(2.5))
		)
	)
)
