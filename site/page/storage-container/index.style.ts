import { child, marginBottom } from "@acryps/style";
import { boxed } from "../shared/boxed";
import { storageContainerTagStyle } from "../shared/storage-container-tag/index.style";
import { railcarCollectionStyle } from "../shared/railcar-collection/index.style";
import { pageGutter } from "../index.style";

export const storageContainerStyle = () => child('ui-storage-container',
	boxed(),

	storageContainerTagStyle(),

	child('ui-storage-container-tag',
		marginBottom(pageGutter)
	),

	railcarCollectionStyle()
)
