import { Component } from "@acryps/page";
import { CouplerViewModel, RailcarService, RailcarSummaryModel, RailcarViewModel } from "../../managed/services";

export class RailcarCouplerSelect extends Component {
	coupler: CouplerViewModel;
	railcars: RailcarSummaryModel[];

	constructor(
		public railcar: RailcarViewModel | null,
		public onSelect: (railcar: RailcarViewModel, coupler: CouplerViewModel) => void
	) {
		super();
	}

	async onload() {
		this.railcars = await new RailcarService().list();
	}

	render() {
		let railcar: RailcarSummaryModel;

		if (this.railcar) {
			railcar = this.railcars.find(railcar => railcar.id == this.railcar.id);
		}

		return <ui-railcar-coupler-select>
			<select $ui-value={railcar} ui-change={async () => {
				this.railcar = await new RailcarService().get(railcar.tag);

				this.update();
			}}>
				{this.railcars.map(railcar => <option ui-value={railcar}>
					{railcar.tag} {railcar.model?.name}{railcar.model?.shortname ? ` (${railcar.model?.shortname})` : ''} {railcar.givenName ? `'${railcar.givenName}'` : ''} - {railcar.runningNumber ?? '#'}
				</option>)}
			</select>

			{this.railcar && <ui-capture>
				<img src={`/capture/railcar/${this.railcar.id}/forward`} />

				<ui-couplers>
					{this.renderCoupler(this.railcar.headCoupler)}
					{this.renderCoupler(this.railcar.tailCoupler)}
				</ui-couplers>
			</ui-capture>}
		</ui-railcar-coupler-select>
	}

	renderCoupler(coupler: CouplerViewModel) {
		if (!coupler) {
			return;
		}

		const element = <ui-coupler ui-selected={coupler.id == this.coupler?.id} ui-click={() => {
			this.coupler = coupler;
			this.onSelect(this.railcar, coupler);

			this.update();
		}}></ui-coupler>;

		element.innerHTML = coupler.type.icon;

		return element;
	}
}
