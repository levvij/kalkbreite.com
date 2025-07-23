import { Component } from "@acryps/page";
import { StorageContainerViewModel, StorageService } from "../managed/services";
import { StorageContainerTagComponent } from "../shared/storage-container-tag";
import { RailcarCollectionComponent } from "../shared/railcar-collection";
import { PrintStorageContainerTagPage } from "./print";

export class StorageContainerPage extends Component {
	declare parameters: { tag };

	storageContainer: StorageContainerViewModel;

	async onload() {
		this.storageContainer = await new StorageService().getContainer(this.parameters.tag);
	}

	render() {
		return <ui-storage-container>
			{new StorageContainerTagComponent(this.storageContainer)}

			<ui-actions>
				<ui-action ui-click={() => PrintStorageContainerTagPage.addToQueue(this.storageContainer.tag)}>
					Add to label printing queue
				</ui-action>

				<ui-action ui-href='../print'>
					Print labels
				</ui-action>
			</ui-actions>

			{new RailcarCollectionComponent(this.storageContainer.railcars)}
		</ui-storage-container>
	}
}
