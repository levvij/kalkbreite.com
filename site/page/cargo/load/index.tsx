import { Component } from "@acryps/page";
import { CargoLoadPreviewComponent } from "../preview";
import { CargoLoadSummaryModel } from "../../managed/services";
import { CargoPage } from "..";
import { CargoLoadIdentifierComponent } from "../../shared/cargo-load-identifier";
import { DetailSectionComponent } from "../../shared/detail-section";

export class CargoLoadPage extends Component {
	declare parameters: { id };
	declare parent: CargoPage;

	load: CargoLoadSummaryModel;

	async onload() {
		this.load = this.parent.loads.find(load => load.id == this.parameters.id);
	}

	render() {
		return <ui-load>
			{new CargoLoadPreviewComponent(this.load, true)}



			{new DetailSectionComponent(<ui-identifier>
				{new CargoLoadIdentifierComponent(this.load.identifier)}
			</ui-identifier>)
				.addMetric('Type', () => this.load.type.name)
				.addMetric('Fixture', () => this.load.type.fixture.name)
				.addMetric('Height', () => `${this.load.type.height.toFixed(2)}m`)
				.addMetric('Length', () => `${(this.load.type.oversizeHead + this.load.type.fixture.length + this.load.type.oversizeTail).toFixed(2)}m`)
				.addStakeholder('Owner', this.load.owner)
			}
		</ui-load>
	}
}
