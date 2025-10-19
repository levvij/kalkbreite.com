import { Component } from "@acryps/page";
import { ReportIncidentPage } from ".";
import { RailcarSelect } from "../../../shared/railcar-select";
import { IncidentService, RailcarSummaryModel } from "../../../managed/services";

export class ReportDerailmentIncidentPage extends ReportIncidentPage {
	railcar: RailcarSummaryModel;

	renderFields() {
		return [
			<ui-field>
				<label>Railcar</label>

				{new RailcarSelect(null, railcar => this.railcar = railcar)}
			</ui-field>
		];
	}

	async report() {
		await new IncidentService().reportDerailment(
			this.position.section.domainName,
			this.position.offset,
			this.railcar.id,
			this.failed
		);
	}
}
