import { Component } from "@acryps/page";
import { RailcarService, RailcarSummaryModel } from "../managed/services";
import { ReaderComponent } from "./reader";
import { RailcarCollectionComponent } from "../shared/railcar-collection";
import { SlideshowComponent } from "./slideshow";

export class HomePage extends Component {
	railcars: RailcarSummaryModel[];

	async onload() {
		this.railcars = await new RailcarService().list();
	}

	render() {
		return <ui-home>
			{new SlideshowComponent()}

			<ui-content>
				<ui-guide>
					Welcome to Kalkbreite Model Railway. A playground for railway operations, electronics, software and street art.
				</ui-guide>

				<ui-actions>
					{new ReaderComponent()}
				</ui-actions>

				{new RailcarCollectionComponent(this.railcars)}
			</ui-content>
		</ui-home>
	}
}
