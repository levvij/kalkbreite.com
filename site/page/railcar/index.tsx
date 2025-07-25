import { Component, ComponentContent } from "@acryps/page";
import { CompanySummaryModel, RailcarService, RailcarViewModel } from "../managed/services";
import { containerIcon, goIcon, lengthIncludingBuffersIcon, lengthIncludingCouplersIcon } from "../assets/icons/managed";
import { MetaProduct } from "@acryps/metadata";
import { StorageContainerTagComponent } from "../shared/storage-container-tag";
import { SlideshowComponent } from "../shared/slideshow";
import { GraffitiCollectionComponent } from "../shared/graffiti-collection";
import { ContentAppendable } from "@acryps/style";
import { DetailSectionComponent } from "../shared/detail-section";

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

			{this.railcar.captures.length != 0 && new SlideshowComponent(index => `/capture/${this.railcar.captures[index % this.railcar.captures.length]?.id}`)}

			<ui-detail>
				{this.railcar.note && <ui-note>
					{this.railcar.note}
				</ui-note>}

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
			</ui-detail>
		</ui-railcar>;
	}
}
