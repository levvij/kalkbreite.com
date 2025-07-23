import { Component, ComponentContent } from "@acryps/page";
import { CompanySummaryModel } from "../../managed/services";

export class DetailSectionComponent extends Component {
	sections: ComponentContent[] = [];

	constructor(
		private header: ComponentContent
	) {
		super();
	}

	addMetric(name: string, value: () => ComponentContent, link?: string) {
		try {
			this.sections.push(<ui-metric ui-click={() => link && this.navigate(link)} ui-link={!!link}>
				<ui-name>
					{name}
				</ui-name>

				<ui-value>
					{value()}
				</ui-value>
			</ui-metric>);
		} catch {}

		return this;
	}

	addStakeholder(role: string, company: CompanySummaryModel) {
		if (company) {
			this.sections.push(<ui-stakeholder>
				<ui-role>
					{role}
				</ui-role>

				<ui-company ui-href={`/company/${company.tag}`}>
					{company.iconId && <img src={`/company/icon/${company.id}`} />}

					{company.shortname && !company.iconId && <ui-name>
						{company.shortname}
					</ui-name>}
				</ui-company>
			</ui-stakeholder>)
		}

		return this;
	}

	render() {
		return <ui-detail-section>
			{this.header}

			<ui-sections>
				{this.sections}
			</ui-sections>
		</ui-detail-section>
	}
}
