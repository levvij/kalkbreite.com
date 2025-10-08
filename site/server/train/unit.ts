import { CompanySummaryModel } from "../company/company";
import { RailcarSummaryModel } from "../railcar/railcar";
import { StorageContainerSummaryModel } from "../storage/storage-contaiuner";

export class TrainRailcarUnitViewModel extends RailcarSummaryModel {
	owner: CompanySummaryModel;
	operator: CompanySummaryModel;
	storageContainer: StorageContainerSummaryModel;
}
