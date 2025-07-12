import { Component } from "@acryps/page";
import { CompanySummaryModel, RailcarService, RailcarViewModel } from "../managed/services";
import { lengthIncludingBuffersIcon, lengthIncludingCouplersIcon } from "../assets/icons/managed";
import { MetaProduct } from "@acryps/metadata";

export class RailcarPage extends Component {
	declare parameters: { tag };

	railcar: RailcarViewModel;

	async onload() {
		this.railcar = await new RailcarService().get(this.parameters.tag);

		new MetaProduct({
			name: this.railcar.givenName ?? this.railcar.model?.name ?? '-',
			sku: this.railcar.tag,
			image: `/capture/${this.railcar.id}`
		}).apply();
	}

	render() {
		return <ui-railcar>
			<ui-header>
				<ui-name>
					{this.railcar.givenName ?? this.railcar.model?.name ?? '-'}
				</ui-name>

				<ui-identifiers>
					<ui-running-number>
						{this.railcar.runningNumber}
					</ui-running-number>

					<ui-tag>
						{this.railcar.tag}
					</ui-tag>

					<img src={`/tag/${this.railcar.tag}`} />
				</ui-identifiers>
			</ui-header>

			<ui-capture>
				<ui-image>
					<img src={`/capture/${this.railcar.id}`} />
				</ui-image>
			</ui-capture>

			<ui-detail>
				{this.railcar.note && <ui-note>
					{this.railcar.note}
				</ui-note>}

				<ui-metrics>
					{this.renderMetric(lengthIncludingBuffersIcon(), `${this.railcar.model.lengthIncludingBuffers}m`)}
					{this.renderMetric(lengthIncludingCouplersIcon(), `${this.railcar.model.lengthIncludingCouplers}m`)}
				</ui-metrics>

				<ui-stakeholders>
					{this.renderStakeholder(this.railcar.owner, 'Owner')}
					{this.renderStakeholder(this.railcar.operator, 'Operator')}
					{this.renderStakeholder(this.railcar.manufacturer, 'Manufacturer')}
				</ui-stakeholders>
			</ui-detail>
		</ui-railcar>;
	}

	renderMetric(icon: Element, value: string) {
		return <ui-metric>
			{icon}

			<ui-value>
				{value}
			</ui-value>
		</ui-metric>;
	}

	renderStakeholder(company: CompanySummaryModel, role: string) {
		if (!company) {
			return;
		}

		return <ui-stakeholder ui-href={`/company/${company.id}`}>
			<img src={`/company/icon/${company.id}`} />

			<ui-role>
				{role}
			</ui-role>
		</ui-stakeholder>
	}
}
