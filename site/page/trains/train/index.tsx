import { Component } from "@acryps/page";
import { RailcarSummaryModel, TrainRailcarUnitViewModel, TrainService, TrainStateViewModel, TrainUnitViewModel } from "../../managed/services";
import { Application } from "../..";
import { TrainsPage } from "..";
import { StorageContainerTagComponent } from "../../shared/storage-container-tag";
import { DetailSectionComponent } from "../../shared/detail-section";
import { coupleIcon, uncoupleIcon } from "../../.built/icons";
import { LayoutComponent } from "../../shared/layout";
import { markerColor } from "../../index.style";
import { LayoutLoader } from "../../shared/layout/loader";
import { Section, SectionPosition } from "@packtrack/layout";

export class TrainPage extends Component {
	declare parameters: { identifier };
	declare parent: TrainsPage;

	state: TrainStateViewModel;
	units: TrainRailcarUnitViewModel[];

	length = 0;

	async onload() {
		this.state = await new TrainService().getTrain(this.parameters.identifier);
		this.units = await new TrainService().getTrainRailcars(this.parameters.identifier);

		for (let unit of this.units) {
			this.length += unit.model.lengthIncludingCouplers;
		}
	}

	breadcrumb = () => `Train${this.state.label ? ` ${this.state.label.label}` : ''} #${this.parameters.identifier}`;
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

			{this.state.label && <ui-label>
				{this.state.label?.productBrand && <img src={URL.createObjectURL(new Blob([this.state.label.productBrand.icon], { type: 'image/svg+xml' }))} />}

				<ui-name>
					{this.state.label.label}
				</ui-name>
			</ui-label>}

			<ui-units>
				<ui-action ui-href='couple/head'>
					{coupleIcon()}
				</ui-action>

				{this.units.map((unit, index) => [
					<ui-unit ui-href={`/railcar/${unit.tag}`}>
						<img src={`/capture/railcar/${unit.id}/forward`} />

						<ui-detail>
							{new DetailSectionComponent(<ui-header>
								<ui-tag>
									{unit.tag}
								</ui-tag>

								<ui-name>
									{unit.givenName || unit.model?.name || unit.runningNumber}
								</ui-name>
							</ui-header>)
								.addMetric('Type', () => unit.model?.name, `/model/${unit.model?.tag}`)
								.addMetric('Running Number', () => unit.runningNumber)
								.addStakeholder('Owner', unit.owner)
								.addStakeholder('Operator', unit.operator)
								.addMetric('Storage Container', () => unit.storageContainer?.tag, `/storage-container/${unit.storageContainer?.tag}`)}
						</ui-detail>
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
			const tail = head.advance(-this.length);

			layout.mark(markerColor, head, tail);
		}));

		return layout;
	}
}
