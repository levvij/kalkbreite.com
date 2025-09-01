import { Component } from "@acryps/page";
import { RailcarSummaryModel, TrainService } from "../../managed/services";
import { Application } from "../..";

export class TrainPage extends Component {
	declare parameters: { identifier };

	units: RailcarSummaryModel[];

	async onload() {
		this.units = await new TrainService().getTrain(this.parameters.identifier);
	}

	render() {
		return <ui-train>
			<ui-identifier>
				{this.parameters.identifier}
			</ui-identifier>

			<ui-units>
				{this.units.map(unit => <ui-unit ui-href={`/railcar/${unit.tag}`}>
					<img src={`/capture/railcar/${unit.id}/forward`} />

					<ui-tag>
						{unit.tag}
					</ui-tag>

					{Application.session.account && <ui-action ui-click={async () => {
						await new TrainService().uncoupleAfter(unit.id);

						this.reload();
					}}>
						UC
					</ui-action>}
				</ui-unit>)}
			</ui-units>
		</ui-train>
	}
}
