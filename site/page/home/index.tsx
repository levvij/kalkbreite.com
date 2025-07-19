import { Component } from "@acryps/page";
import { RailcarService, RailcarSummaryModel } from "../managed/services";
import { ReaderComponent } from "./reader";
import { RailcarCollectionComponent } from "../shared/railcar-collection";

export class HomePage extends Component {
	railcars: RailcarSummaryModel[];

	async onload() {
		this.railcars = await new RailcarService().list();
	}

	render() {
		return <ui-home>
			<ui-guide>
				Welcome to Kalkbreite Model Railway.
			</ui-guide>

			{new ReaderComponent()}

			{new RailcarCollectionComponent(this.railcars)}
		</ui-home>
	}
}
