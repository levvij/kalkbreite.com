import { ViewModel } from "vlserver";
import { Railcar } from "../managed/database";
import { RailcarModelSummaryModel, RailcarModelViewModel } from "./model";
import { CompanySummaryModel } from "../company/company";
import { StorageContainerSummaryModel } from "../storage/storage-contaiuner";
import { GraffitiSummaryModel } from "../graffiti/graffiti";
import { CaptureViewModel } from "../capture/capture";
import { CouplerViewModel } from "./coupler";
import { MaintenanceSummaryModel } from "../maintenace/maintenace";

export class RailcarSummaryModel extends ViewModel<Railcar> {
	id;
	tag;

	givenName;
	runningNumber;

	model: RailcarModelSummaryModel;
}

export class GraffitiRailcarViewModel extends RailcarSummaryModel {
	graffitis: GraffitiSummaryModel[];
}

export class RailcarViewModel extends RailcarSummaryModel {
	aquired;
	note;

	model: RailcarModelViewModel;

	owner: CompanySummaryModel;
	operator: CompanySummaryModel;
	manufacturer: CompanySummaryModel;

	storageContainer: StorageContainerSummaryModel;
	captures: CaptureViewModel[];
	graffitis: GraffitiSummaryModel[];

	headCoupler: CouplerViewModel;
	tailCoupler: CouplerViewModel;

	maintenanceJobs: MaintenanceSummaryModel[];
}
