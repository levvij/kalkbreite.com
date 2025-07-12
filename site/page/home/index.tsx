import { Component } from "@acryps/page";
import { RailcarService, RailcarSummaryModel } from "../managed/services";
import { ReaderComponent } from "./reader";

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

			<ui-railcars>
				{this.railcars.map(railcar => <ui-railcar ui-href={`/railcar/${railcar.tag}`}>
					<img src={`/capture/${railcar.id}`} />

					<ui-header>
						<ui-name>
							{railcar.givenName ?? railcar.model?.name ?? '-'}
						</ui-name>

						<ui-tag>
							{railcar.tag}
						</ui-tag>
					</ui-header>

					<ui-running-number>
						{railcar.runningNumber}
					</ui-running-number>
				</ui-railcar>)}
			</ui-railcars>
		</ui-home>
	}
}
