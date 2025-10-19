import { child, display, marginBottom, padding } from "@acryps/style";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { boxed } from "../shared/boxed";
import { pageSpacing } from "../index.style";

export const railcarsStyle = () => child('ui-railcars') (
	boxed(),
	padding(pageSpacing),

	child('ui-metrics') (
		display('block'),
		marginBottom(pageSpacing)
	),

	railcarCollectionStyle()
)
