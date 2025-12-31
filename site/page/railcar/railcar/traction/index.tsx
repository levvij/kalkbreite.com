import { Component } from "@acryps/page";
import { TractionViewModel } from "../../../managed/services";
import { RailcarPage } from "..";
import { DetailSectionComponent } from "../../../shared/detail-section";

export class TractionComponent extends Component {
	declare parameters: { id };
	declare parent: RailcarPage;

	traction: TractionViewModel;

	async onload() {
		this.traction = this.parent.railcar.tractionActors.find(traction => traction.id == this.parameters.id);
	}

	render() {
		return <ui-traction>
			{new DetailSectionComponent(<ui-dcc-address>
				DCC-{this.traction.dccAddress}
			</ui-dcc-address>)
			.addMetric('Acceleration', () => `${this.traction.acceleration} m/s²`)
			.addMetric('Deceleration', () => `${this.traction.deceleration ?? '*'} m/s²`)
			.addMetric('Max Speed', () => `${this.traction.maximumSpeed} km/h`)
			.addMetric('DCC Address (Hex)', () => `${this.traction.dccAddress.toString(16)}`)

			}
		</ui-traction>
	}
}
