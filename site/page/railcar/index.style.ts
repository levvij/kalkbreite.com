import { child, display, marginBottom, padding } from "@acryps/style";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { boxed } from "../shared/boxed";
import { pageSpacing } from "../index.style";
import { railcarStyle } from "./railcar/index.style";
import { buttonGroupStyle, buttonStyle } from "../shared/button";
import { registerRailcarStyle } from "./register/index.style";
import { capturesStyle } from "./capture/index.style";

export const railcarsStyle = () => child('ui-railcars') (
	display('block'),

	railcarStyle(),
	registerRailcarStyle(),
	capturesStyle(),

	child('ui-overview') (
		boxed(),
		padding(pageSpacing),

		child('ui-hint') (
			display('block'),
			marginBottom(pageSpacing)
		),

		child('ui-actions') (
			buttonGroupStyle(),
			marginBottom(pageSpacing),

			child('ui-action') (
				buttonStyle()
			)
		),

		railcarCollectionStyle()
	)
)
