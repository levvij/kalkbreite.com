import { child, marginBottom, padding, paddingBlock } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { storageContainerTagStyle } from "../shared/storage-container-tag/index.style";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { pageGutter, pageSpacing } from "../index.style";
import { buttonGroupStyle, buttonStyle } from "../shared/button";

export const storageContainerStyle = () => child('ui-storage-container') (
	boxed(),

	padding(pageSpacing),

	storageContainerTagStyle(),

	child('ui-actions') (
		buttonGroupStyle(),
		marginBottom(pageSpacing),

		child('ui-action') (
			buttonStyle()
		)
	),

	child('ui-storage-container-tag') (
		marginBottom(pageGutter)
	),

	railcarCollectionStyle()
)
