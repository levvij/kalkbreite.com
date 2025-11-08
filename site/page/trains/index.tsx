import { Component } from "@acryps/page";
import { TrainLabelViewModel, TrainProductBrandSummaryModel, TrainService, TrainViewModel } from "../managed/services";
import { active } from "@acryps/style";
import { TrainLabelComponent } from "../shared/train-label";

export class TrainsPage extends Component {
	trains: TrainViewModel[];
	labels: TrainLabelViewModel[];

	activeFilters: TrainProductBrandSummaryModel[] = [];

	async onload() {
		this.trains = await new TrainService().getTrains();
		this.labels = await new TrainService().getActiveLabels();
	}

	breadcrumb = 'Trains';
	render(child) {
		if (child) {
			return <ui-trains>
				{child}
			</ui-trains>;
		}

		const usedProductBrands = this.labels
			.filter(label => this.trains.find(train => train.identifier == label.trainIdentifier))
			.filter(item => item?.productBrand)
			.map(label => label.productBrand)
			.filter((item, index, array) => array.findIndex(peer => peer.id == item.id) == index)
			.sort((a, b) => a.name.localeCompare(b.name));

		let trains: TrainViewModel[] = [];

		if (this.activeFilters.length == 0) {
			trains = this.trains;
		} else {
			for (let train of this.trains) {
				const label = this.labels.find(label => label.trainIdentifier == train.identifier);

				if (this.activeFilters.find(filter => filter.id == label?.productBrand?.id)) {
					trains.push(train);
				}
			}
		}

		return <ui-trains>
			<ui-hint>
				The following trains are currently assembled on the layout.
				Explore their composition, where they currently are and where they are headed.
			</ui-hint>

			<ui-filters>
				{usedProductBrands.map(brand => <ui-product-brand ui-active={!!this.activeFilters.find(filter => filter.id == brand.id)} ui-click={() => {
					const index = this.activeFilters.findIndex(filter => filter.id == brand.id);

					if (index == -1) {
						this.activeFilters.push(brand);
					} else {
						this.activeFilters.splice(index, 1);
					}

					this.update();
				}}>
					<img src={URL.createObjectURL(new Blob([brand.icon], { type: 'image/svg+xml' }))} />
				</ui-product-brand>)}
			</ui-filters>

			<ui-list>
				{trains.map(train => {
					const label = this.labels.find(label => label.trainIdentifier == train.identifier);

					return <ui-train>
						{label && new TrainLabelComponent(label)}

						<ui-detail ui-href={train.identifier}>
							<ui-identifier>
								{label?.operator?.trainPrefix ? `${label.operator.trainPrefix}-${train.identifier}` : train.identifier}
							</ui-identifier>

							<ui-railcar-count>
								{train.railcarCount}
							</ui-railcar-count>

							<ui-coupled-length>
								{train.coupledLength.toFixed(1)}m
							</ui-coupled-length>

							<ui-changed>
								{train.changed.toISOString().replace('T', ' ').replace(/\.[0-9]+Z$/, '')}
							</ui-changed>

							<ui-location ui-href={`/layout/section/${train.section}`}>
								{train.section.split('.')[0]}
							</ui-location>
						</ui-detail>

						<ui-capture>
							<img ui-href={train.identifier} src={`/capture/train/${train.identifier}`} loading='lazy' />
						</ui-capture>
					</ui-train>
				})}
			</ui-list>
		</ui-trains>
	}
}
