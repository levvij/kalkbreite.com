import { Component } from "@acryps/page";
import { CouplerViewModel, RailcarDirection, RailcarService, RailcarSummaryModel, RailcarViewModel } from "../../managed/services";

export class RailcarSideSelect extends Component {
	selectedSide: RailcarDirection;
	railcars: RailcarSummaryModel[];

	constructor(
		public railcar: RailcarSummaryModel | null,
		public onSelect: (railcar: RailcarSummaryModel, side: RailcarDirection) => void
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

		return <ui-railcar-side-select>
			<select $ui-value={railcar} ui-change={async () => {
				this.railcar = await new RailcarService().get(railcar.tag);

				this.update();
			}}>
				{this.railcars.map(railcar => <option ui-value={railcar}>
					{railcar.tag} {railcar.model?.name}{railcar.model?.shortname ? ` (${railcar.model?.shortname})` : ''} {railcar.givenName ? `'${railcar.givenName}'` : ''} - {railcar.runningNumber ?? '#'}
				</option>)}
			</select>

			{this.railcar && <ui-sides>
				{this.renderSide(RailcarDirection.forward, 'Forward')}
				{this.renderSide(RailcarDirection.reverse, 'Reverse')}
			</ui-sides>}
		</ui-railcar-side-select>
	}

	renderSide(side: RailcarDirection, name: string) {
		return <ui-side ui-selected={side == this.selectedSide}>
			<img
				src={`/capture/railcar/${this.railcar.id}/${side}`}
				ui-click={() => {
					this.selectedSide = side;
					this.onSelect(this.railcar, side);

					this.update();
				}}
			/>

			<ui-name>
				{name}
			</ui-name>
		</ui-side>;
	}
}
