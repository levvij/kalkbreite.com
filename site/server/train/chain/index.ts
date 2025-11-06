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

		const couplings = await database.coupling.toArray();
		const uncouplings = await database.uncoupling.toArray();

		const actions = [
			...couplings.map(coupling => ({
				time: coupling.coupled,
				restore: async () => await chain.couple(coupling.sourceId, coupling.targetId, coupling.coupled)
			})),
			...uncouplings.map(uncoupling => ({
				time: uncoupling.uncoupled,
				restore: async () => await chain.uncouple(uncoupling.sourceId, uncoupling.uncoupled)
			}))
		];

		actions.sort((a, b) => +a.time > +b.time ? 1 : -1);

		for (let action of actions) {
			await action.restore();
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
			await railcar.model.fetch(),
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

	// decouples two railcars
	//
	// the railcar owning the breaking coupler will keep the train identifier, while the peer will get a new train
	async uncouple(breakingCouplerId: string, time: Date) {
		this.hasher.update('uncouple');
		this.hasher.update(breakingCouplerId);

		const sourceUnit = this.units.find(unit => unit.railcar.headCouplerId == breakingCouplerId || unit.railcar.tailCouplerId == breakingCouplerId);
		const sourceTrain = this.trains.find(train => train.units.includes(sourceUnit));

		// get all railcars after the broken coupler
		const split = sourceTrain.split(breakingCouplerId);

		if (split.before.length == 0 || split.after.length == 0) {
			throw new Error(`Cannot uncouple loose coupler '${breakingCouplerId}'`);
		}

		// remove link between the last railcar and the first railcar of the split off train
		split.before.at(-1).tail.target = null;
		split.after.at(0).head.target = null;

		let before: CoupledUnit[];
		let after: CoupledUnit[];

		if (sourceUnit.tail.coupler?.id && sourceUnit.tail.coupler?.id == breakingCouplerId) {
			before = split.before;
			after = split.after;
		} else {
			before = split.after;
			after = split.before;
		}

		// shrink old train
		sourceTrain.units = before;
		sourceTrain.changed = time;

		// create new train with the loose railcars if they are not attached to somewhere
		const train = new Train(this.createIdentifier(), time);
		train.units = after;

		this.trains.push(train);
	}

	// couples two railcars together
	// automatically rearranges trains, creating and deleting them as required
	//
	// the train of source will keep the train, while the target train will be disbanded
	async couple(sourceId: string, targetId: string, time: Date) {
		this.hasher.update('couple');
		this.hasher.update(sourceId);
		this.hasher.update(targetId);

		// find the source train and unit
		const sourceUnit = this.units.find(unit => unit.railcar.headCouplerId == sourceId || unit.railcar.tailCouplerId == sourceId);
		const sourceTrain = this.trains.find(train => train.units.includes(sourceUnit));
		sourceTrain.changed = time;

		// find the target where this coupling attaches to
		const targetUnit = this.units.find(unit => unit.railcar.headCouplerId == targetId || unit.railcar.tailCouplerId == targetId);

		if (sourceUnit == targetUnit) {
			throw new Error(`Source '${targetUnit.railcar.tag}' cannot be coupled to itself (${sourceId} / ${targetId}).`);
		}

		if (targetUnit.head.target && targetUnit.tail.target) {
			throw new Error(`Target '${targetUnit.railcar.tag}' is coupled (${targetUnit.head.target.railcar.tag} / ${targetUnit.tail.target.railcar.tag})`);
		}

		const targetTrain = this.trains.find(train => train.units.includes(targetUnit));
		targetTrain.changed = time;

		// source tail is directly coupled to target head
		if (
			sourceUnit.tail.coupler?.id == sourceId &&
			sourceUnit.tail.coupler?.id == sourceId &&
			targetUnit.head.coupler?.id == targetId
		) {
			sourceTrain.units = [...sourceTrain.units, ...targetTrain.units];

			sourceUnit.tail.target = targetUnit;
			targetUnit.head.target = sourceUnit;
		}

		// source head is coupled to target tail
		if (
			sourceUnit.head.coupler?.id &&
			sourceUnit.head.coupler?.id == sourceId &&
			targetUnit.tail.coupler?.id == targetId
		) {
			sourceTrain.units = [...targetTrain.units, ...sourceTrain.units];

			sourceUnit.head.target = targetUnit;
			targetUnit.tail.target = sourceUnit;
		}

		// source tail is connected to target tail, flip target
		if (
			sourceUnit.tail.coupler?.id &&
			sourceUnit.tail.coupler?.id == sourceId &&
			targetUnit.tail.coupler?.id == targetId
		) {
			targetTrain.reverse();
			sourceTrain.units = [...sourceTrain.units, ...targetTrain.units];

			sourceUnit.tail.target = targetUnit;
			targetUnit.head.target = sourceUnit;
		}

		// source train is connected with head to target train, which needs to be flipped
		if (
			sourceUnit.head.coupler?.id &&
			sourceUnit.head.coupler?.id == sourceId &&
			targetUnit.head.coupler?.id == targetId
		) {
			targetTrain.reverse();
			sourceTrain.units = [...targetTrain.units, ...sourceTrain.units];

			sourceUnit.head.target = targetUnit;
			targetUnit.tail.target = sourceUnit;
		}

		this.trains.splice(this.trains.indexOf(targetTrain), 1);
		this.onDisband(targetTrain, targetTrain.units);
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
