import { Coupler, Railcar, RailcarDirection } from "../../managed/database";

export class CoupledUnit {
	constructor(
		public railcar: Railcar,
		public head: { coupler: Coupler, target?: CoupledUnit },
		public tail: { coupler: Coupler, target?: CoupledUnit }
	) {}

	get direction() {
		if (this.railcar.headCouplerId == this.head.coupler.id) {
			return RailcarDirection.forward;
		}

		return RailcarDirection.reverse;
	}
}
