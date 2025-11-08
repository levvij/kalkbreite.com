import { Coupler, CouplerType, Railcar, Traction, TrainChain } from "@packtrack/train";
import { Coupling, Coupler as DatabaseCoupler, Railcar as DatabaseRailcar, DbContext, RailcarComission, RailcarModel, RailcarWithdrawal, Uncoupling } from "../managed/database";
import { LayoutPlan } from "../layout-plan/interface";
import { SectionPosition } from "@packtrack/layout";
import { Application } from "..";
import { findSection } from "./layout";

type HistoryItem = {
	action: Coupling | Uncoupling | RailcarComission | RailcarWithdrawal,
	time: Date
};

export class ChainRestorer {
	couplerTypes = new Map<string, CouplerType>();
	railcars: Railcar[] = [];

	constructor(
		private database: DbContext
	) { }

	async importDatabase() {
		for (let type of await this.database.couplerType.toArray()) {
			this.couplerTypes.set(type.id, new CouplerType(type.name));
		}

		for (let railcar of await this.database.railcar.toArray()) {
			if (railcar.modelId) {
				await this.importRailcar(railcar);
			}
		}

		const chain = new TrainChain();

		const history: HistoryItem[] = [
			...(await this.database.coupling.toArray())
				.map(action => ({ action, time: action.coupled })),

			...(await this.database.uncoupling.toArray())
				.map(action => ({ action, time: action.uncoupled })),

			...(await this.database.railcarComission.toArray())
				.map(action => ({ action, time: action.comissioned })),

			...(await this.database.railcarWithdrawal.toArray())
				.map(action => ({ action, time: action.withdrawn }))
		];

		history.sort((a, b) => {
			if (a.time == b.time) {
				return a.action.id.localeCompare(b.action.id);
			}

			return +a.time > +b.time ? 1 : -1
		});

		for (let historyItem of history) {
			if (historyItem.action instanceof Coupling) {
				await chain.couple(
					this.findCoupler(historyItem.action.sourceId),
					this.findCoupler(historyItem.action.targetId),
					historyItem.time
				);
			}

			if (historyItem.action instanceof Uncoupling) {
				await chain.uncouple(
					this.findCoupler(historyItem.action.sourceId),
					historyItem.time
				);
			}

			if (historyItem.action instanceof RailcarComission) {
				const position = new SectionPosition(
					findSection(historyItem.action.section),
					historyItem.action.offset,
					historyItem.action.reversed
				);

				await chain.comission(
					this.findRailcar(historyItem.action.railcarId),
					position,
					historyItem.time
				);
			}

			if (historyItem.action instanceof RailcarWithdrawal) {
				await chain.withdraw(
					this.findRailcar(historyItem.action.railcarId),
					historyItem.time
				);
			}
		}

		return chain;
	}

	async importRailcar(source: DatabaseRailcar) {
		const existing = this.railcars.find(railcar => railcar.identifier == source.id);

		if (existing) {
			return existing;
		}

		const model = await source.model.fetch();

		if (!model) {
			throw new Error(`Cannot import railcar without a model`);
		}

		const railcar = new Railcar(
			source.id,
			model.lengthIncludingCouplers,
			120,
			1,
			null,
			this.importCoupler(await source.headCoupler.fetch()),
			this.importCoupler(await source.tailCoupler.fetch())
		);

		if (railcar.headCoupler) {
			railcar.headCoupler.railcar = railcar;
		}

		if (railcar.tailCoupler) {
			railcar.tailCoupler.railcar = railcar;
		}

		this.railcars.push(railcar);

		for (let tractionSource of await source.tractionActors.toArray()) {
			const traction = new Traction(tractionSource.acceleration, tractionSource.maximumSpeed);

			railcar.traction.push(traction);
		}

		return railcar;
	}

	private findRailcar(id: string) {
		return this.railcars.find(railcar => railcar.identifier == id);
	}

	private findCoupler(id: string) {
		for (let railcar of this.railcars) {
			for (let coupler of [railcar.headCoupler, railcar.tailCoupler]) {
				if (coupler?.identifier == id) {
					return coupler;
				}
			}
		}
	}

	private importCoupler(source: DatabaseCoupler) {
		if (!source) {
			return;
		}

		return new Coupler(
			source.id,
			this.couplerTypes.get(source.typeId),
			0,
			null
		);
	}
}
