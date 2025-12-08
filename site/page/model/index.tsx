import { Component } from "@acryps/page";
import { CargoSlotViewModel, RailcarModelService, RailcarModelSummaryModel, RailcarModelViewModel, RailcarService, RailcarSummaryModel } from "../managed/services";
import { RailcarCollectionComponent } from "../shared/railcar-collection";
import { UicIdentifierComponent } from "./uic-identifier";
import { RailcarModelCargoComponent } from "./cargo";
import { fixtureIcon } from "../.built/icons";
import { cargoOffset } from "./index.style";
import { percentage } from "@acryps/style";

export class ModelPage extends Component {
	declare parameters: { tag };

	model: RailcarModelViewModel;
	railcars: RailcarSummaryModel[];

	async onload() {
		this.model = await new RailcarModelService().getModel(this.parameters.tag);
		this.model.cargoSlots.sort((a, b) => a.fixture.name.localeCompare(b.fixture.name));

		this.railcars = await new RailcarModelService().getRailcars(this.model.id);
	}

	breadcrumb = () => `Railcar Model ${this.model.name}`;
	render() {
		const fixtures = this.findFixtures();

		return <ui-railcar-model>
			{this.model.drawings.map(drawing => <ui-technical-drawing>
				<img src={`/model/drawing/${drawing.id}`} />
			</ui-technical-drawing>)}

			<ui-name>
				{this.model.name}
			</ui-name>

			<ui-summary>
				{this.model.summary}
			</ui-summary>

			{this.model.uicIdentifier && new UicIdentifierComponent(this.model.uicIdentifier, this.model.uicLocale)}

			{fixtures.length != 0 && <ui-cargo-slots>
				{fixtures.map(fixture => new RailcarModelCargoComponent(this.model, fixture))}

				<ui-base>
					<ui-name>
						{this.model.name}
					</ui-name>

					<ui-length>
						{this.model.lengthIncludingBuffers.toFixed(1)}m
					</ui-length>
				</ui-base>

				<ui-fixture-points>
					{this.model.cargoSlots.map(slot => [
						this.renderFixture('head', slot.offset),
						this.renderFixture('tail', slot.offset + slot.fixture.length)
					])}
				</ui-fixture-points>
			</ui-cargo-slots>}

			{new RailcarCollectionComponent(this.railcars)}
		</ui-railcar-model>
	}

	renderFixture(side: string, offset: number) {
		return <ui-fixture
			ui-side={side}
			style={cargoOffset.provide(percentage(100 / this.model.lengthIncludingBuffers * offset))}
		>
			{fixtureIcon()}
		</ui-fixture>;
	}

	findFixtures() {
		const fixtures: CargoSlotViewModel[][] = [];
		const remainingSlots = [...this.model.cargoSlots]
			.sort((a, b) => a.offset - b.offset);

		while (remainingSlots.length) {
			const root = remainingSlots.shift();
			const slots: CargoSlotViewModel[] = [root];
			fixtures.push(slots);

			let x = root.offset + root.fixture.length;

			for (let slot of [...remainingSlots]) {
				if (slot.fixture.id == root.fixture.id) {
					if (slot.offset + 0.001 > x) {
						slots.push(slot);
						remainingSlots.splice(remainingSlots.indexOf(slot), 1);

						x = slot.offset + slot.fixture.length;
					}
				}
			}
		}

		fixtures.sort((a, b) => a[0].fixture.name.localeCompare(b[0].fixture.name));

		return fixtures;
	}
}
