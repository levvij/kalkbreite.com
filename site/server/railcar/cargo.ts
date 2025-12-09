import { ViewModel } from "vlserver";
import { CargoLoad } from "../managed/database";
import { CompanySummaryModel, CompanyViewModel } from "../company/company";
import { CargoLoadTypeViewModel, CargoSlotViewModel } from "../model/cargo";

export class RailcarCargoLoadViewModel extends ViewModel<CargoLoad> {
	id;
	identifier;

	name;
	color;
	logoColor;

	owner: CompanySummaryModel;

	type: CargoLoadTypeViewModel;
	slot: CargoSlotViewModel;
}
