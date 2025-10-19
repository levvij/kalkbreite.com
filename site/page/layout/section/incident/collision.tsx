import { Component } from "@acryps/page";
import { ReportIncidentPage } from ".";
import { RailcarSelect } from "../../../shared/railcar-select";
import { IncidentService, RailcarSummaryModel } from "../../../managed/services";

export class ReportCollisionIncidentPage extends ReportIncidentPage {
	source: RailcarSummaryModel;
	target: RailcarSummaryModel;

	renderFields() {
		return [
			<ui-field>
				<label>Railcar</label>

				{new RailcarSelect(null, railcar => this.source = railcar)}
				{new RailcarSelect(null, railcar => this.target = railcar)}
			</ui-field>
		];
	}

	async report() {
		await new IncidentService().reportCollision(
			this.position.section.domainName,
			this.position.offset,
			this.source.id,
			this.target.id,
			this.failed
		);
	}
}
