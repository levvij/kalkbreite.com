import { Component } from "@acryps/page";
import { CompanyService, CompanySummaryModel, CompanyViewModel } from "../managed/services";
import { RailcarCollectionComponent } from "../shared/railcar-collection";

export class CompanyPage extends Component {
	declare parameters: { tag };

	company: CompanyViewModel;

	async onload() {
		this.company = await new CompanyService().get(this.parameters.tag);
	}

	render() {
		return <ui-company>
			<ui-header>
				<ui-logo>
					<img src={`/company/logo/${this.company.id}`} />
				</ui-logo>

				<ui-name>
					{this.company.name}
				</ui-name>

				{this.company.shortname && <ui-shortname>
					“{this.company.shortname}”
				</ui-shortname>}

				{this.company.parent && <ui-parent ui-href={`../${this.company.parent.tag}`}>
					Subsidiary of {this.company.parent.name}
				</ui-parent>}
			</ui-header>

			<ui-detail>
				<ui-description>
					{this.company.description}
				</ui-description>

				{new RailcarCollectionComponent([
					...this.company.manufacturedRailcars,
					...this.company.ownedRailcars,
					...this.company.operatedRailcars
				].filter((railcar, index, list) => list.findIndex(peer => peer.id == railcar.id) == index))}
			</ui-detail>
		</ui-company>;
	}
}
