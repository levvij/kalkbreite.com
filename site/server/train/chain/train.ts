import { randomBytes } from "crypto";
import { Coupler, TrainLabel } from "../../managed/database";
import { CoupledUnit } from "./railcar";

export class Train {
	changed: Date = this.created;

	constructor(
		public identifier: string,
		public created: Date
	) {}

	get railcarCount(): number {
		return this.units.length;
	}

	get coupledLength(): number {
		let sum = 0;

		for (let unit of this.units) {
			if (unit.model) {
				sum += unit.model.lengthIncludingCouplers;
			}
		}

		return sum;
	}

	get headCoupler() {
		return this.units.at(0).head.coupler;
	}

	get headCouplerType(): string {
		return this.headCoupler?.typeId;
	}

	get tailCoupler() {
		return this.units.at(-1).tail.coupler;
	}

	get tailCouplerType(): string {
		return this.tailCoupler?.typeId;
	}

	units: CoupledUnit[] = [];

	split(couplerId: string) {
		const targetHeadIndex = this.units.findIndex(unit => unit.head.coupler?.id && unit.head.coupler?.id == couplerId);

		if (targetHeadIndex != -1) {
			return {
				before: this.units.slice(0, targetHeadIndex),
				after: this.units.slice(targetHeadIndex)
			}
		}

		const targetTailIndex = this.units.findIndex(unit => unit.tail.coupler?.id && unit.tail.coupler?.id == couplerId);

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
