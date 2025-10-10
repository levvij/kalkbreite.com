import { Service } from "vlserver";
import { MaintenanceViewModel } from "./maintenace";
import { DbContext, Maintenance } from "../managed/database";

export class MaintenanceService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async get(id: string) {
		return new MaintenanceViewModel(
			await this.database.maintenance.find(id)
		);
	}

	async start(railcarId: string) {
		const maintenance = new Maintenance();
		maintenance.started = new Date();
		maintenance.railcarId = railcarId;
		maintenance.cost = 0;
		maintenance.title = '';
		maintenance.issue = '';
		maintenance.description = '';

		await maintenance.create();

		return maintenance.id;
	}

	async save(viewModel: MaintenanceViewModel) {
		const maintenance = await viewModel.toModel();

		await maintenance.update();
	}

	async complete(id: string) {
		const maintenance = await this.database.maintenance.find(id);
		maintenance.completed = new Date();

		await maintenance.update();
	}
}
