import { child, fontSize, rem } from "@acryps/style";
import { boxed } from "../../../shared/boxed";
import { detailSectionStyle } from "../../../shared/detail-section/index.style";

export const tractionStyle = () => child('ui-traction') (
	boxed(),

	detailSectionStyle(
		child('ui-dcc-address') (
			fontSize(rem(4))
		)
	)
);
