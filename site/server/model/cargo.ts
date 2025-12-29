import { ViewModel } from "vlserver";
import { CargoFixture, CargoLoadType, CargoSlot } from "../managed/database";

export class CargoSlotViewModel extends ViewModel<CargoSlot> {
	id;

	fixture: CargoFixtureViewModel;

	direction;
	offset;
	baseline;

	clearanceHead;
	clearanceTail;
}

export class CargoFixtureSummaryModel extends ViewModel<CargoFixture> {
	id;
	name;
	length;
}

export class CargoFixtureViewModel extends CargoFixtureSummaryModel {
	loadTypes: CargoLoadTypeViewModel[];
}

export class CargoLoadTypeViewModel extends ViewModel<CargoLoadType> {
	id;
	name;

	height;
	oversizeHead;
	oversizeTail;
}
