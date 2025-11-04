import { Coupler, Railcar, RailcarDirection, RailcarModel } from "../../managed/database";

export class CoupledUnit {
	constructor(
		public railcar: Railcar,
		public model: RailcarModel,
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
