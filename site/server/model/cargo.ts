import { ViewModel } from "vlserver";
import { CargoFixture, CargoLoadType, CargoSlot } from "../managed/database";

export class CargoSlotViewModel extends ViewModel<CargoSlot> {
	id;

	fixture: CargoFixtureViewModel;

	direction;
	offset;

	clearanceHead;
	clearanceTail;
}

export class CargoFixtureViewModel extends ViewModel<CargoFixture> {
	id;
	name;
	length;

	loadTypes: CargoLoadTypeViewModel[];
}

export class CargoLoadTypeViewModel extends ViewModel<CargoLoadType> {
	id;
	name;

	oversizeHead;
	oversizeTail;
}
