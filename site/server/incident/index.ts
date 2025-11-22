import { Service } from "vlserver";
import { CollisionIncident, DbContext, DecouplingIncident, DerailingIncident, PowerLossIncident } from "../managed/database";
import { DecouplingIncidentViewModel } from "./decoupling";
import { PowerLossIncidentViewModel } from "./power-loss";
import { CollisionIncidentViewModel } from "./collision";
import { DerailingIncidentViewModel } from "./derailing";

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

	async reportDerailing(section: string, position: number, railcarId: string, failed: Date) {
		const report = new DerailingIncident();
		report.section = section;
		report.position = position;
		report.railcarId = railcarId;
		report.failed = failed;

		await report.create();
	}

	async reportCollision(section: string, position: number, sourceId: string, targetId: string, failed: Date) {
		const report = new CollisionIncident();
		report.section = section;
		report.position = position;
		report.sourceRailcarId = sourceId;
		report.targetRailcarId = targetId;
		report.failed = failed;

		await report.create();
	}

	async reportPowerLoss(section: string, position: number, railcarId: string, failed: Date) {
		const report = new PowerLossIncident();
		report.section = section;
		report.position = position;
		report.railcarId = railcarId;
		report.failed = failed;

		await report.create();
	}

	async getDecouplingIncidents() {
		return DecouplingIncidentViewModel.from(this.database.decouplingIncident);
	}

	async getDerailingIncidents() {
		return DerailingIncidentViewModel.from(this.database.derailingIncident);
	}

	async getCollisionIncidents() {
		return CollisionIncidentViewModel.from(this.database.collisionIncident);
	}

	async getPowerLossIncidents() {
		return PowerLossIncidentViewModel.from(this.database.powerLossIncident);
	}
}
