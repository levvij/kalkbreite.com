import { ViewModel } from "vlserver";
import { Railcar, StorageContainer } from "../managed/database";
import { RailcarSummaryModel, RailcarViewModel } from "../railcar/railcar";

export class StorageContainerSummaryModel extends ViewModel<StorageContainer> {
	id;
	tag;
}

export class StorageContainerViewModel extends StorageContainerSummaryModel {
	railcars: RailcarSummaryModel[];
}
