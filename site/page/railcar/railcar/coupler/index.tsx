import { Component } from "@acryps/page";
import { RailcarPage } from "..";
import { CouplerViewModel } from "../../../managed/services";

export class RailcarCouplerPage extends Component {
	declare parent: RailcarPage;
	declare parameters: { direction: 'head' | 'tail' };

	coupler: CouplerViewModel;

	async onload() {
		this.coupler = this.parameters.direction == 'head' ? this.parent.railcar.headCoupler : this.parent.railcar.tailCoupler;
	}

	render() {
		return <ui-coupler>
			<ui-type>
				{this.coupler.type.name}
			</ui-type>

			<ui-identifier>
				{this.coupler.id}
			</ui-identifier>
		</ui-coupler>
	}
}
