import { ViewModel } from "vlserver";
import { CargoLoad, CargoLoadType } from "../managed/database";
import { CargoFixtureSummaryModel, CargoFixtureViewModel, CargoLoadTypeViewModel } from "../model/cargo";
import { CompanySummaryModel } from "../company/company";
import { RailcarSummaryModel } from "../railcar/railcar";

export class CargoLoadSummaryModel extends ViewModel<CargoLoad> {
	id;
	tag;
	identifier;

	color;
	logoColor;

	owner: CompanySummaryModel;
	railcar: RailcarSummaryModel;
	type: CargoLoadTypeSummarModel;
}

export class CargoLoadTypeSummarModel extends ViewModel<CargoLoadType> {
	id;
	name;

	height;
	fixture: CargoFixtureSummaryModel;

	oversizeHead;
	oversizeTail;
}
