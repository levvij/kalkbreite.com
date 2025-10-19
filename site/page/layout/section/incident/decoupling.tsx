import { Component, ComponentContent } from "@acryps/page";
import { ReportIncidentPage } from ".";
import { RailcarSelect } from "../../../shared/railcar-select";
import { CouplerViewModel, IncidentService, RailcarService, RailcarSummaryModel, RailcarViewModel } from "../../../managed/services";
import { RailcarCouplerSelect } from "../../../shared/railcar-coupler-select";

export class ReportDecouplingIncidentPage extends ReportIncidentPage {
	coupler: CouplerViewModel;

	renderFields() {
		return [
			<ui-field>
				<label>Railcar</label>

				{new RailcarCouplerSelect(null, (railcar, coupler) => this.coupler = coupler)}
			</ui-field>
		];
	}

	async report() {
		await new IncidentService().reportDecoupling(
			this.position.section.domainName,
			this.position.offset,
			this.coupler.id,
			this.failed
		);
	}
}
