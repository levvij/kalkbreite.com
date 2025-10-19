import { child } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { sectionStyle } from "./section/index.style";
import { layoutStyle } from "../shared/layout/index.style";

export const layoutPageStyle = () => child('ui-layout')(
	boxed(),

	sectionStyle(),
	layoutStyle()
);
