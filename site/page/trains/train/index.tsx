import { Component } from "@acryps/page";
import { RailcarSummaryModel, TrainRailcarUnitViewModel, TrainService, TrainUnitViewModel } from "../../managed/services";
import { Application } from "../..";
import { coupleIcon, uncoupleIcon } from "../../assets/icons/managed";
import { TrainsPage } from "..";
import { StorageContainerTagComponent } from "../../shared/storage-container-tag";
import { DetailSectionComponent } from "../../shared/detail-section";

export class TrainPage extends Component {
	declare parameters: { identifier };
	declare parent: TrainsPage;

	units: TrainRailcarUnitViewModel[];

	async onload() {
		this.units = await new TrainService().getTrain(this.parameters.identifier);
	}

	breadcrumb = () => `Train ${this.parameters.identifier}`;
	render(child) {
		if (child) {
			return <ui-train>
				{child}
			</ui-train>;
		}

		return <ui-train>
			<ui-identifier>
				{this.parameters.identifier}
			</ui-identifier>

			<ui-units>
				<ui-action ui-href='couple/head'>
					{coupleIcon()}
				</ui-action>

				{this.units.map((unit, index) => [
					<ui-unit ui-href={`/railcar/${unit.tag}`}>
						<img src={`/capture/railcar/${unit.id}/forward`} />

						{new DetailSectionComponent(<ui-header>
							<ui-name>
								{unit.givenName || unit.model?.name || unit.runningNumber}
							</ui-name>

							<ui-tag>
								{unit.tag}
							</ui-tag>
						</ui-header>)
							.addMetric('Type', () => unit.model?.name, `/model/${unit.model?.tag}`)
							.addMetric('Running Number', () => unit.runningNumber)
							.addStakeholder('Owner', unit.owner)
							.addStakeholder('Operator', unit.operator)
							.addMetric('Storage Container', () => unit.storageContainer?.tag, `/storage-container/${unit.storageContainer?.tag}`)}
					</ui-unit>,

					Application.session.account && index != this.units.length - 1 && <ui-action ui-click={async () => {
						await new TrainService().uncoupleAfter(unit.id);

						this.reload();
					}}>
						{uncoupleIcon()}
					</ui-action>
				])}

				<ui-action ui-href='couple/tail'>
					{coupleIcon()}
				</ui-action>
			</ui-units>
		</ui-train>
	}
}
