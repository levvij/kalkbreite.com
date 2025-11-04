import { Component } from "@acryps/page";
import { TrainLabelViewModel, TrainProductBrandSummaryModel, TrainService, TrainViewModel } from "../managed/services";
import { active } from "@acryps/style";

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
			.filter((item, index, array) => array.findIndex(peer => peer.id == item.id) == index);

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
						{label && <ui-label ui-href={train.identifier}>
							{label?.productBrand && <img src={URL.createObjectURL(new Blob([label.productBrand.icon], { type: 'image/svg+xml' }))} />}

							<ui-name>
								{label.label}
							</ui-name>
						</ui-label>}

						<ui-detail ui-href={train.identifier}>
							<ui-identifier>
								{train.identifier}
							</ui-identifier>

							<ui-type>
								{train.length == 1 ? 'S' : train.length}
							</ui-type>

							<ui-changed>
								{train.changed.toISOString().replace('T', ' ').replace(/\.[0-9]+Z$/, '')}
							</ui-changed>
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
