import { Component } from "@acryps/page";
import { RailcarService, RailcarSummaryModel } from "../../managed/services";

export class RailcarSelect extends Component {
	railcars: RailcarSummaryModel[];

	constructor(
		public railcar: RailcarSummaryModel | null,
		public onSelect: (railcar: RailcarSummaryModel) => void
	) {
		super();
	}

	async onload() {
		this.railcars = await new RailcarService().list();

		if (this.railcar) {
			this.railcar = this.railcars.find(railcar => railcar.id == this.railcar.id);
		}
	}

	render() {
		return <ui-railcar-select>
			<select $ui-value={this.railcar} ui-change={() => {
				this.update();

				this.onSelect(this.railcar);
			}}>
				{this.railcars.map(railcar => <option ui-value={railcar}>
					{railcar.tag} {railcar.model?.name}{railcar.model?.shortname ? ` (${railcar.model?.shortname})` : ''} {railcar.givenName ? `'${railcar.givenName}'` : ''} - {railcar.runningNumber ?? '#'}
				</option>)}
			</select>

			{this.railcar && <ui-capture>
				<img src={`/capture/railcar/${this.railcar.id}`} />
			</ui-capture>}
		</ui-railcar-select>
	}
}
