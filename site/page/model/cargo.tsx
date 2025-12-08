import { Component } from "@acryps/page";
import { CargoLoadTypeViewModel, CargoSlotViewModel, RailcarDirection, RailcarModelViewModel } from "../managed/services";
import { percentage } from "@acryps/style";
import { cargoLength, cargoOffset } from "./index.style";
import { forwardIcon, reverseIcon } from "../.built/icons";

export class RailcarModelCargoComponent extends Component {
	overlappingLoadTypes = new Map<string, CargoLoadTypeViewModel[]>();

	constructor(
		private model: RailcarModelViewModel,
		private slots: CargoSlotViewModel[]
	) {
		super();
	}

	render() {
		for (let slot of this.slots) {
			slot.fixture.loadTypes.sort((a, b) => a.name.localeCompare(b.name));

			// remove clearance limits
			for (let loadType of [...slot.fixture.loadTypes]) {
				if (slot.clearanceHead !== null && loadType.oversizeHead > slot.clearanceHead) {
					slot.fixture.loadTypes.splice(slot.fixture.loadTypes.indexOf(loadType), 1);
				}

				if (slot.clearanceTail !== null && loadType.oversizeTail > slot.clearanceTail) {
					slot.fixture.loadTypes.splice(slot.fixture.loadTypes.indexOf(loadType), 1);
				}
			}
		}

		this.findOverlappingLoadTypes(this.slots);

		// use margin based offsetting to automatically get height of items
		let x = 0;

		return <ui-variant>
			{this.slots.map(slot => {
				const offset = 100 / this.model.lengthIncludingBuffers * slot.offset;
				const width = 100 / this.model.lengthIncludingBuffers * slot.fixture.length;

				const element = <ui-slot style={[
					cargoOffset.provide(percentage(offset - x)),
					cargoLength.provide(percentage(width))
				].join(';')}>
					{slot.fixture.loadTypes.map(type => this.renderLoadTypes(slot, type))}

					<ui-detail>
						<ui-name>
							{slot.direction == RailcarDirection.forward && forwardIcon()}
							{slot.fixture.name}
							{slot.direction == RailcarDirection.reverse && reverseIcon()}
						</ui-name>

						<ui-length>
							{slot.fixture.length.toFixed(1)}m
						</ui-length>
					</ui-detail>
				</ui-slot>;

				x = offset + width;

				return element;
			})}
		</ui-variant>
	}

	renderLoadTypes(slot: CargoSlotViewModel, type: CargoLoadTypeViewModel) {
		const overlap = this.overlappingLoadTypes.get(type.id);

		return <ui-load-type
			ui-overlap={overlap ? (overlap.indexOf(type) % 2 ? 'even' : 'odd') : 'none'}
			style={[
				cargoOffset.provide(percentage(100 / slot.fixture.length * -type.oversizeHead)),
				cargoLength.provide(percentage(100 / slot.fixture.length * (slot.fixture.length + type.oversizeHead + type.oversizeTail)))
			].join(';')}
		>
			<ui-name>
				{type.name}
			</ui-name>

			<ui-length>
				{(slot.fixture.length + type.oversizeHead + type.oversizeTail).toFixed(1)}m
			</ui-length>
		</ui-load-type>;
	}

	findOverlappingLoadTypes(slots: CargoSlotViewModel[]) {
		this.overlappingLoadTypes.clear();

		const root = slots[0];

		for (let typeIndex = 0; typeIndex < root.fixture.loadTypes.length; typeIndex++) {
			const type = root.fixture.loadTypes[typeIndex];

			if (this.findOverlap(type, slots)) {
				this.overlappingLoadTypes.set(type.id, slots.map(slot => slot.fixture.loadTypes[typeIndex]));
			}
		}
	}

	findOverlap(type: CargoLoadTypeViewModel, slots: CargoSlotViewModel[]) {
		let last = 0;

		for (let slot of slots) {
			const offset = slot.offset + type.oversizeHead;

			// small offset for rounding issues
			if (offset + 0.0001 < last) {
				return true;
			}

			last = offset + slot.fixture.length + type.oversizeTail;
		}

		return false;
	}
}
