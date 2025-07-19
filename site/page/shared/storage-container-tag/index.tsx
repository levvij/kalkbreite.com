import { Component } from "@acryps/page";
import { StorageContainerSummaryModel } from "../../managed/services";

export class StorageContainerTagComponent extends Component {
	constructor(
		private storageContainer: StorageContainerSummaryModel
	) {
		super();
	}

	render() {
		return <ui-storage-container-tag ui-href={`/storage-container/${this.storageContainer.tag}`}>
			<img src={`/tag/storage/${StorageContainerTagComponent.wrap(this.storageContainer)}`} />

			<ui-name>
				{this.storageContainer.name}
			</ui-name>

			<ui-tag>
				{StorageContainerTagComponent.wrap(this.storageContainer)}
			</ui-tag>
		</ui-storage-container-tag>;
	}

	static wrap(container: StorageContainerSummaryModel) {
		return `KLKRS-${container.tag}`;
	}
}
