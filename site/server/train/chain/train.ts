import { randomBytes } from "crypto";
import { Coupler } from "../../managed/database";
import { CoupledUnit } from "./railcar";

export class Train {
	changed: Date = this.created;

	constructor(
		public identifier: string,
		public created: Date
	) {}

	get length(): number {
		return this.units.length;
	}

	get headCoupler() {
		return this.units.at(0).head.coupler;
	}

	get tailCoupler() {
		return this.units.at(-1).tail.coupler;
	}

	units: CoupledUnit[] = [];

	split(couplerId: string) {
		const targetHeadIndex = this.units.findIndex(unit => unit.head.coupler.id == couplerId);

		if (targetHeadIndex != -1) {
			return {
				before: this.units.slice(0, targetHeadIndex),
				after: this.units.slice(targetHeadIndex)
			}
		}

		const targetTailIndex = this.units.findIndex(unit => unit.tail.coupler.id == couplerId);

		if (targetTailIndex != -1) {
			return {
				before: this.units.slice(0, targetTailIndex + 1),
				after: this.units.slice(targetTailIndex + 1)
			}
		}

		throw new Error(`Coupler '${couplerId}' not on any of ${this.identifier} trains unit`);
	}

	reverse() {
		this.units.reverse();

		for (let unit of this.units) {
			const coupler = unit.head;
			unit.head = unit.tail;
			unit.tail = coupler;
		}
	}
}
