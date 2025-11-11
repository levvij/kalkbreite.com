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
import { imageRatio } from "./index.style";
import { ratio } from "@acryps/style";

export class TrainPage extends Component {
	declare parameters: { identifier };
	declare parent: TrainsPage;

	train: TrainViewModel;
	railcars: TrainRailcarUnitViewModel[];
	label: TrainLabelViewModel;

	async onload() {
		this.train = this.parent.trains.find(train => train.identifier == this.parameters.identifier);
		this.railcars = await new TrainService().getTrainRailcars(this.parameters.identifier);
		this.label = await new TrainService().getLabel(this.parameters.identifier);
	}

	breadcrumb = () => `Train${this.label?.label ? ` ${this.label.label}` : ''} #${this.parameters.identifier}`;
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
					this.renderRailcar(railcar),

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
		</ui-train>
	}

	renderRailcar(railcar: RailcarSummaryModel) {
		const image: HTMLImageElement = <img src={`/capture/train/railcar/${railcar.id}/forward`} />;

		image.onload = () => {
			element.style.setProperty(
				imageRatio.propertyName,
				(image.naturalWidth / image.naturalHeight).toString()
			);
		};

		const element: HTMLElement = <ui-unit ui-href={`/railcar/${railcar.tag}`}>
			{image}

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
		</ui-unit>;

		return element;
	}
}
