import { Component, ComponentContent } from "@acryps/page";
import { CompanySummaryModel, RailcarDirection, RailcarService, RailcarViewModel, TrainService } from "../managed/services";
import { containerIcon, goIcon, headCouplerIcon, lengthIncludingBuffersIcon, lengthIncludingCouplersIcon, tailCouplerIcon, trainLinkupIcon } from "../assets/icons/managed";
import { MetaProduct } from "@acryps/metadata";
import { StorageContainerTagComponent } from "../shared/storage-container-tag";
import { SlideshowComponent } from "../shared/slideshow";
import { GraffitiCollectionComponent } from "../shared/graffiti-collection";
import { ContentAppendable } from "@acryps/style";
import { DetailSectionComponent } from "../shared/detail-section";
import { Application } from "..";
import { CaptureTimelineComponent } from "./capture-timeline";
import { anchorShift } from "../../shared/anchor-shift";

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

	render(child) {
		const forwardCaptures = this.railcar.captures
			.filter(capture => capture.direction == RailcarDirection.forward)
			.sort((a, b) => a.captured > b.captured ? -1 : 1);

		const reverseCaptures = this.railcar.captures
			.filter(capture => capture.direction == RailcarDirection.reverse)
			.sort((a, b) => a.captured > b.captured ? -1 : 1);

		const newestSideCaptures = [forwardCaptures[0], reverseCaptures[0]].filter(capture => capture);

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

			{newestSideCaptures.length != 0 && new SlideshowComponent(index => `/capture/${newestSideCaptures[index % newestSideCaptures.length]?.id}`)}

			<ui-couplers>
				<ui-side>
					{this.railcar.headCoupler && <ui-link ui-href='coupler/head'>
						{headCouplerIcon()}
					</ui-link>}

					<ui-link ui-click={async () => {
						const unit = await new TrainService().getUnitTrain(this.railcar.id);

						this.navigate(`/train/${unit}`);
					}}>
						{trainLinkupIcon()}
					</ui-link>
				</ui-side>

				<ui-side>
					{this.railcar.tailCoupler && <ui-link ui-href='coupler/tail'>
						{tailCouplerIcon()}
					</ui-link>}
				</ui-side>
			</ui-couplers>

			{child ?? <ui-detail>
				{this.railcar.note && <ui-note>
					{this.railcar.note}
				</ui-note>}

				<ui-actions>
					{Application.session?.account && <ui-action ui-href='register-graffiti'>
						Register Graffiti
					</ui-action>}

					{forwardCaptures[0] && <ui-action ui-href={`/capture/${forwardCaptures[0].id}/full`} ui-href-target='blank'>
						Download Capture (Forward)
					</ui-action>}

					{reverseCaptures[0] && <ui-action ui-href={`/capture/${reverseCaptures[0].id}/full`} ui-href-target='blank'>
						Download Capture (Reverse)
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

				{forwardCaptures.length != 0 && new CaptureTimelineComponent(forwardCaptures)}
				{reverseCaptures.length != 0 && new CaptureTimelineComponent(reverseCaptures)}
			</ui-detail>}
		</ui-railcar>;
	}
}
