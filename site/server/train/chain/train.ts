import { randomBytes } from "crypto";
import { Coupler } from "../../managed/database";
import { CoupledUnit } from "./railcar";

export class Train {
	constructor(
		public identifier: string
	) {}

	units: CoupledUnit[] = [];

	split(couplerId: string) {
		const targetUnitIndex = this.units.findIndex(unit => unit.head.coupler.id == couplerId || unit.tail.coupler.id == couplerId);

		return {
			before: this.units.slice(0, targetUnitIndex),
			after: this.units.slice(targetUnitIndex)
		}
	}
}
