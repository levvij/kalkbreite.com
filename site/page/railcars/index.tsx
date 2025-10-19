import { Component } from "@acryps/page";
import { RailcarService, RailcarSummaryModel } from "../managed/services";
import { RailcarCollectionComponent } from "../shared/railcar-collection";

export class RailcarsPage extends Component {
	railcars: RailcarSummaryModel[];

	async onload() {
		this.railcars = await new RailcarService().list();
	}

	render() {
		return <ui-railcars>
			<ui-metrics>
				{this.railcars.length} railcars
			</ui-metrics>

			{new RailcarCollectionComponent(this.railcars)}
		</ui-railcars>
	}
}
