import { Component } from "@acryps/page";
import { CompanyService, CompanySummaryModel } from "../managed/services";

export class CompanyPage extends Component {
	declare parameters: { id };

	company: CompanySummaryModel;

	async onload() {
		this.company = await new CompanyService().get(this.parameters.id);
	}

	render() {
		return <ui-company>
			<ui-logo>
				<ui-image>
					<img src={`/company/logo/${this.company.id}`} />
				</ui-image>
			</ui-logo>

			<ui-detail>
				<ui-name>
					{this.company.name}
				</ui-name>
			</ui-detail>
		</ui-company>;
	}
}
