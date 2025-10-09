import { child } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { sectionStyle } from "./section/index.style";

export const layoutStyle = () => child('ui-layout')(
	boxed(),

	sectionStyle()
);
