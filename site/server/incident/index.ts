import { Service } from "vlserver";
import { DbContext, DecouplingIncident } from "../managed/database";

export class IncidentService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async reportDecoupling(section: string, position: number, couplerId: string, failed: Date) {
		const report = new DecouplingIncident();
		report.section = section;
		report.position = position;
		report.couplerId = couplerId;
		report.failed = failed;

		await report.create();
	}
}
