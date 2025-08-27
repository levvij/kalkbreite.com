import { Component } from "@acryps/page";
import { RailcarSummaryModel, TrainService } from "../managed/services";

export class TrainPage extends Component {
	declare parameters: { identifier };

	units: RailcarSummaryModel[];

	async onload() {
		this.units = await new TrainService().getTrain(this.parameters.identifier);
	}

	render() {
		return <ui-train>
			{this.units.map(unit => <ui-unit>
				<img src={`/capture/railcar/${unit.id}/forward`} />

				<ui-tag>
					{unit.tag}
				</ui-tag>
			</ui-unit>)}
		</ui-train>
	}
}
