import { createHash } from "crypto";
import { Coupler, DbContext, Railcar } from "../../managed/database";
import { CoupledUnit } from "./railcar";
import { Train } from "./train";

export class TrainChain {
	units: CoupledUnit[] = [];
	trains: Train[] = [];

	onDisband = (train: Train, units: CoupledUnit[]) => console.log('disbaned', train.identifier, units.map(unit => unit.railcar.tag));

	private hasher = createHash('sha1');

	static async restore(database: DbContext) {
		const chain = new TrainChain();

		const railcars = await database.railcar
			.include(railcar => railcar.headCoupler)
			.include(railcar => railcar.tailCoupler)
			.toArray();

		for (let railcar of railcars) {
			await chain.add(railcar, railcar.aquired);
		}

		const couplings = await database.coupling
			.orderByAscending(coupling => coupling.coupled)
			.toArray();

		for (let coupling of couplings) {
			await chain.couple(coupling.sourceId, coupling.targetId, coupling.coupled);
		}

		return chain;
	}

	// adds a railcar to the chain
	//
	// each railcar quickly acts as a single train when being created
	// it can be immediately coupled after being created
	async add(railcar: Railcar, time: Date) {
		const unit = new CoupledUnit(
			railcar,
			{ coupler: await railcar.headCoupler.fetch() },
			{ coupler: await railcar.tailCoupler.fetch() }
		);

		const train = new Train(this.createIdentifier(), time);
		train.units.push(unit);

		this.trains.push(train);
		this.units.push(unit);

		this.hasher.update('add');
		this.hasher.update(railcar.id);

		return train;
	}

	// couples tow railcars together
	// automatically rearranges trains, creating and deleting them as required
	//
	// will create new trains if no target is set
	async couple(sourceId: string, targetId: string | null, time: Date) {
		console.group(sourceId, targetId);

		this.hasher.update('couple');
		this.hasher.update(sourceId);
		this.hasher.update(targetId ?? '*');

		// find the railcar detaching itself
		const sourceUnit = this.units.find(unit => unit.railcar.headCouplerId == sourceId || unit.railcar.tailCouplerId == sourceId);
		console.log('source unit', sourceUnit.railcar.tag);

		const sourceTrain = this.trains.find(train => train.units.includes(sourceUnit));
		console.log('source train', sourceTrain.identifier, sourceTrain.units.map(unit => unit.railcar.tag));

		// get all railcars after the broken coupler
		const split = sourceTrain.split(sourceId);
		console.log('split', split.before.map(unit => unit.railcar.tag), split.after.map(unit => unit.railcar.tag));

		// shrink old train
		sourceTrain.units = split.before;
		sourceTrain.changed = time;

		if (sourceTrain.units.length) {
			// remove link
			sourceTrain.units.at(-1).tail.target = null;
			split.after.at(0).head.target = null;
		} else {
			this.onDisband(sourceTrain, split.after);
			this.trains.splice(this.trains.indexOf(sourceTrain), 1);
		}

		// create new train with the loose railcars if they are not attached to somewhere
		if (!targetId) {
			const train = new Train(this.createIdentifier(), time);
			train.units = split.after;

			this.trains.push(train);

			console.groupEnd();

			return train;
		}

		// find target
		const targetUnit = this.units.find(unit => unit.railcar.headCouplerId == targetId || unit.railcar.tailCouplerId == targetId);

		if (sourceUnit == targetUnit) {
			throw new Error(`Source '${targetUnit.railcar.tag}' cannot be coupled to itself (${sourceId} / ${targetId}).`);
		}

		if (targetUnit.head.target && targetUnit.tail.target) {
			throw new Error(`Target '${targetUnit.railcar.tag}' is coupled (${targetUnit.head.target.railcar.tag} / ${targetUnit.tail.target.railcar.tag})`);
		}

		console.log('target unit', targetUnit.railcar.tag);

		const targetTrain = this.trains.find(train => train.units.includes(targetUnit));

		console.log('target train', targetTrain.identifier, targetTrain.units.map(unit => unit.railcar.tag));

		const appendingUnits = [...split.after];
		let anchor: CoupledUnit;

		if (targetTrain.units.at(-1) == targetUnit) {
			anchor = appendingUnits.at(0);

			targetUnit.tail.target = anchor;
			anchor.head.target = targetUnit;
		} else if (targetTrain.units.at(0) == targetUnit) {
			// reverse what is after the split, we are hanging onto the head
			// flip unit head/tails
			appendingUnits.reverse();

			for (let unit of appendingUnits) {
				const coupler = unit.head;
				unit.head = unit.tail;
				unit.tail = coupler;
			}

			anchor = appendingUnits.at(0);

			targetUnit.head.target = anchor;
			anchor.tail.target = targetUnit;
		} else {
			throw new Error(`Target '${targetUnit.railcar.tag}' is not head or tail of train`);
		}

		targetTrain.units.push(...appendingUnits);
		targetTrain.changed = time;

		console.groupEnd();
	}

	dump() {
		const singles = this.trains.filter(train => train.units.length == 1);
		const trains = this.trains.filter(train => train.units.length != 1);

		console.group();

		for (let train of trains) {
			console.group(train.identifier);

			for (let unit of train.units) {
				console.log(
					unit.head.target ? `<${unit.head.target.railcar.tag}` : '<**',
					`(( ${unit.railcar.tag} ))`,
					unit.tail.target ? `${unit.tail.target.railcar.tag}>` : '**>'
				);
			}

			console.groupEnd();
		}

		console.log(`singles: ${singles.map(single => single.units.at(0).railcar.tag).join(' ')}`)

		console.groupEnd();
	}

	private createIdentifier() {
		return this.hasher
			.update('identifier')
			.copy()
			.digest('base64url')
			.replace(/[^A-Z0-9]/g, '')
			.substring(0, 6);
	}
}
