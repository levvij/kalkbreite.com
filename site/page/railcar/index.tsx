import { Component, ComponentContent } from "@acryps/page";
import { CaptureViewModel, CompanySummaryModel, CouplerViewModel, MaintenanceService, RailcarDirection, RailcarService, RailcarViewModel, TrainService } from "../managed/services";
import { MetaProduct } from "@acryps/metadata";
import { StorageContainerTagComponent } from "../shared/storage-container-tag";
import { SlideshowComponent } from "../shared/slideshow";
import { GraffitiCollectionComponent } from "../shared/graffiti-collection";
import { ContentAppendable } from "@acryps/style";
import { DetailSectionComponent } from "../shared/detail-section";
import { Application } from "..";
import { TimelineComponent } from "./timeline";
import { trainLinkupIcon, flipIcon, downloadIcon } from "../.built/icons";

export class RailcarPage extends Component {
	declare parameters: { tag };

	railcar: RailcarViewModel;
	train: string;

	captureImage = new Image();

	async onload() {
		this.railcar = await new RailcarService().get(this.parameters.tag);
		this.train = await new TrainService().getUnitTrain(this.railcar.id);

		new MetaProduct({
			name: this.railcar.givenName ?? this.railcar.model?.name ?? '-',
			sku: this.railcar.tag,
			image: `/capture/${this.railcar.id}`
		}).apply();
	}

	breadcrumb = () => this.railcar.givenName ?? this.railcar.model?.name ?? '-';
	render(child) {
		const timeline = new TimelineComponent();
		timeline.addItem(this.railcar.aquired, 'Aquired model');

		// add captures to timeline
		timeline.addItems(this.railcar.captures, capture => [
			capture.captured,
			<ui-capture ui-click={() => this.showCapture(capture)}>
				<ui-name>
					Captured {capture.direction}
				</ui-name>

				<img src={`/capture/${capture.id}`} />
			</ui-capture>
		]);

		// add maintenance to timeline
		timeline.addItems(this.railcar.maintenanceJobs, maintenance => [
			maintenance.opened,
			<ui-maintenance ui-href={`maintenance/${maintenance.id}`}>
				Maintenance <ui-name>{maintenance.title}</ui-name> opened
			</ui-maintenance>
		]);

		timeline.addItems(this.railcar.maintenanceJobs.filter(job => job.completed), maintenance => [
			maintenance.completed,
			<ui-maintenance ui-href={`maintenance/${maintenance.id}`}>
				Maintenance <ui-name>{maintenance.title}</ui-name> completed
			</ui-maintenance>
		]);

		// add graffitis
		timeline.addItems(this.railcar.graffitis.filter(graffiti => graffiti.painted), graffiti => [
			graffiti.painted,
			<ui-graffiti ui-href={`/graffiti/${graffiti.id}`}>
				<ui-name>
					Painted {graffiti.name ? `'${graffiti.name}'` : `a ${graffiti.type.name}`} graffiti {graffiti.artist && `by ${graffiti.artist.name}`}
				</ui-name>

				<img src={`/capture/graffiti/${graffiti.id}`} />
			</ui-graffiti>
		])

		const forwardCaptures = this.railcar.captures
			.filter(capture => capture.direction == RailcarDirection.forward)
			.sort((a, b) => a.captured > b.captured ? -1 : 1);

		const reverseCaptures = this.railcar.captures
			.filter(capture => capture.direction == RailcarDirection.reverse)
			.sort((a, b) => a.captured > b.captured ? -1 : 1);

		const newestSideCaptures = [forwardCaptures[0], reverseCaptures[0]].filter(capture => capture);

		if (newestSideCaptures.length) {
			this.showCapture(newestSideCaptures[0]);
		}

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

			{this.railcar.captures.length != 0 && <ui-capture>
				<ui-container>
					{this.captureImage}
				</ui-container>
			</ui-capture>}

			<ui-toolbar>
				<ui-group>
					{this.renderCoupler('head', this.railcar.headCoupler)}

					<ui-tool ui-href={`/train/${this.train}`}>
						{trainLinkupIcon()}

						<ui-train>
							{this.train}
						</ui-train>
					</ui-tool>

					{this.renderCoupler('tail', this.railcar.tailCoupler)}
				</ui-group>

				{newestSideCaptures.length != 0 && <ui-group>
					{newestSideCaptures.length == 2 && <ui-tool ui-click={() => {
						for (let capture of newestSideCaptures) {
							if (!this.captureImage.src.includes(capture.id)) {
								this.showCapture(capture);

								return;
							}
						}
					}}>
						{flipIcon()}
					</ui-tool>}

					<ui-tool ui-click={() => open(`${this.captureImage.src}/full`)}>
						{downloadIcon()}
					</ui-tool>
				</ui-group>}
			</ui-toolbar>

			{child ?? <ui-detail>
				{this.railcar.note && <ui-note>
					{this.railcar.note}
				</ui-note>}

				<ui-actions>
					{Application.session?.account && <ui-action ui-href='register-graffiti'>
						Register Graffiti
					</ui-action>}

					{Application.session?.account && <ui-action ui-click={async () => {
						const maintenance = await new MaintenanceService().open(this.railcar.id);

						this.navigate(`maintenance/${maintenance}`);
					}}>
						Open Maintenance
					</ui-action>}

					{Application.session?.account && <ui-action ui-click={async () => {
						await new RailcarService().updateStorageState(this.railcar.id, !this.railcar.stored);
						this.railcar.stored = !this.railcar.stored;

						this.update();
					}}>
						Put {this.railcar.stored ? 'on Layout' : 'into Storage'}
					</ui-action>}
				</ui-actions>

				{this.railcar.model && new DetailSectionComponent(<ui-model ui-href={`/model/${this.railcar.model.tag}`}>
					<ui-name>
						{this.railcar.model.shortname}
					</ui-name>

					<ui-summary>
						{this.railcar.model.summary}
					</ui-summary>
				</ui-model>)
					.addMetric('Length including Buffers', () => `${this.railcar.model.lengthIncludingBuffers}m`)
					.addMetric('Length between couplers', () => `${this.railcar.model.lengthIncludingCouplers}m`)
					.addStakeholder('Operator', this.railcar.operator)
					.addStakeholder('Owner', this.railcar.owner)
				}

				{new DetailSectionComponent(<ui-miniature-manufacturer ui-href={`/company/${this.railcar.manufacturer?.tag}`}>
					{this.railcar.manufacturer && <img src={`/company/icon/${this.railcar.manufacturer?.id}`} />}

					<ui-name>
						Miniature by {this.railcar.manufacturer?.shortname ?? this.railcar.manufacturer?.name}
					</ui-name>
				</ui-miniature-manufacturer>)
					.addMetric('Aquired', () => this.railcar.aquired.toLocaleDateString())
					.addMetric('Capture Count', () => this.railcar.captures.length.toString())
					.addMetric('Scale Length Between Couplers', () => `${(this.railcar.model.lengthIncludingCouplers / 0.087).toFixed(0)}mm`)
				}

				{this.railcar.graffitis.length != 0 && new GraffitiCollectionComponent(this.railcar.graffitis)}

				{this.railcar.storageContainer && new StorageContainerTagComponent(this.railcar.storageContainer)}

				{timeline}
			</ui-detail>}
		</ui-railcar>;
	}

	renderCoupler(side: string, coupler: CouplerViewModel) {
		if (!coupler) {
			return;
		}

		const button = <ui-tool ui-href={`coupler/${side}`} ui-href-active ui-side={side}></ui-tool>;
		button.innerHTML = coupler.type.icon;

		return button;
	}

	showCapture(capture: CaptureViewModel) {
		this.captureImage.src = `/capture/${capture.id}`;
	}
}
