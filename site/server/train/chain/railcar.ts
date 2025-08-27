import { Coupler, Railcar } from "../../managed/database";

export class CoupledUnit {
	constructor(
		public railcar: Railcar,
		public head: { coupler: Coupler, target?: CoupledUnit },
		public tail: { coupler: Coupler, target?: CoupledUnit }
	) {}
}
