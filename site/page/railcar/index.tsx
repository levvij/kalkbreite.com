import { Component } from "@acryps/page";
import { RailcarService, RailcarSummaryModel } from "../managed/services";
import { RailcarCollectionComponent } from "../shared/railcar-collection";
import { Application } from "..";

export class RailcarsPage extends Component {
	static shortcuts = ['railcars', 'r'];

	railcars: RailcarSummaryModel[];

	async onload() {
		this.railcars = await new RailcarService().list();
	}

	breadcrumb = 'Rolling Stock';
	render(child) {
		if (child) {
			return <ui-railcars>
				{child}
			</ui-railcars>
		}

		return <ui-railcars>
			<ui-overview>
				<ui-hint>
					Explore the {this.railcars.length} railcars currently registered at Kalkbreite.
					View their timeline, explore the high-resultion pictures and find operational details about them.
				</ui-hint>

				<ui-actions>
					<ui-action ui-href='captures'>
						View Captures
					</ui-action>

					{Application.session.account && <ui-action ui-href={`/railcar/register/${(Math.max(...this.railcars.map(railcar => parseInt(railcar.tag, 36))) + 1).toString(36)}`}>
						Register Railcar
					</ui-action>}
				</ui-actions>

				{new RailcarCollectionComponent(this.railcars)}
			</ui-overview>
		</ui-railcars>
	}
}
