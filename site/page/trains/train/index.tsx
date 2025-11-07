import { Component } from "@acryps/page";
import { RailcarSummaryModel, TrainLabelViewModel, TrainRailcarUnitViewModel, TrainService, TrainStateViewModel, TrainUnitViewModel, TrainViewModel } from "../../managed/services";
import { Application } from "../..";
import { TrainsPage } from "..";
import { StorageContainerTagComponent } from "../../shared/storage-container-tag";
import { DetailSectionComponent } from "../../shared/detail-section";
import { coupleIcon, uncoupleIcon } from "../../.built/icons";
import { LayoutComponent } from "../../shared/layout";
import { markerColor } from "../../index.style";
import { LayoutLoader } from "../../shared/layout/loader";
import { Section, SectionPosition } from "@packtrack/layout";
import { TrainLabelComponent } from "../../shared/train-label";

export class TrainPage extends Component {
	declare parameters: { identifier };
	declare parent: TrainsPage;

	train: TrainViewModel;
	state: TrainStateViewModel;
	railcars: TrainRailcarUnitViewModel[];
	label: TrainLabelViewModel;

	async onload() {
		this.train = this.parent.trains.find(train => train.identifier == this.parameters.identifier);
		this.state = await new TrainService().getTrain(this.parameters.identifier);
		this.railcars = await new TrainService().getTrainRailcars(this.parameters.identifier);
		this.label = await new TrainService().getLabel(this.parameters.identifier);
	}

	breadcrumb = () => `Train${this.state.label ? ` ${this.state.label.label}` : ''} #${this.parameters.identifier}`;
	render(child) {
		if (child) {
			return <ui-train>
				{child}
			</ui-train>;
		}

		return <ui-train>
			{this.label && <ui-label>
				{new TrainLabelComponent(this.label)}
			</ui-label>}

			{new DetailSectionComponent(<ui-identifier>
				{this.parameters.identifier}
			</ui-identifier>)
				.addMetric('Chain Identifier', () => this.parameters.identifier)
				.addMetric('Railcar Count', () => `${this.train.railcarCount} Units`)
				.addMetric('Coupled Length', () => `${this.train.coupledLength.toFixed(2)}m`)
				.addMetric('Created', () => this.train.created.toLocaleString())
				.addMetric('Changed', () => this.train.changed.toLocaleString())
				.addMetric('Age', () => `${((+new Date() - +this.train.created) / 1000 / 60 / 60).toFixed(1)}h`)}

			{Application.session.account && <ui-actions>
				<ui-action ui-href='label'>
					Assign Label
				</ui-action>
			</ui-actions>}

			<ui-units>
				{this.train.headCouplerType && <ui-action ui-href='couple/head'>
					{coupleIcon()}
				</ui-action>}

				{this.railcars.map((railcar, index) => [
					<ui-unit ui-href={`/railcar/${railcar.tag}`}>
						<img src={`/capture/railcar/${railcar.id}/forward`} />

						<ui-detail>
							{new DetailSectionComponent(<ui-header>
								<ui-tag>
									{railcar.tag}
								</ui-tag>

								<ui-name>
									{railcar.givenName || railcar.model?.name || railcar.runningNumber}
								</ui-name>
							</ui-header>)
								.addMetric('Type', () => railcar.model?.name, `/model/${railcar.model?.tag}`)
								.addMetric('Running Number', () => railcar.runningNumber)}
						</ui-detail>
					</ui-unit>,

					Application.session.account && index != this.railcars.length - 1 && <ui-action ui-click={async () => {
						await new TrainService().uncoupleAfter(railcar.id);

						this.reload();
					}}>
						{uncoupleIcon()}
					</ui-action>
				])}

				{this.train.tailCouplerType && <ui-action ui-href='couple/tail'>
					{coupleIcon()}
				</ui-action>}
			</ui-units>

			{this.state.lastHeadPosition && this.renderLayout()}
		</ui-train>
	}

	private renderLayout() {
		const layout = new LayoutComponent();

		LayoutLoader.load().then(() => requestAnimationFrame(() => {
			let section: Section;

			for (let district of layout.layout.allDistricts) {
				for (let peer of district.sections) {
					if (peer.domainName == this.state.lastHeadPosition.section) {
						section = peer;
					}
				}
			}

			if (!section) {
				return;
			}

			layout.highlight(section);

			const head = new SectionPosition(section, this.state.lastHeadPosition.offset, this.state.lastHeadPosition.reversed);
			const tail = head.advance(-this.train.coupledLength);

			layout.mark(markerColor, head, tail);
		}));

		return layout;
	}
}
