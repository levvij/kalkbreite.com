import { Component } from "@acryps/page";
import { CargoLoadSummaryModel } from "../managed/services";
import { cargoHeight, cargoLoadColor, cargoLoadLogoColor } from "../railcar/railcar/index.style";
import { hex, percentage, ratio } from "@acryps/style";
import { cargoOffset } from "../model/index.style";
import { CargoLoadIdentifierComponent } from "../shared/cargo-load-identifier";

export class CargoLoadPreviewComponent extends Component {
	constructor(
		private load: CargoLoadSummaryModel,
		private showIdentifier = false
	) {
		super();
	}

	render() {
		const logo = <ui-logo></ui-logo>;
		logo.style.mask = `url('/company/logo/${this.load.owner.id}') no-repeat center / contain`;

		const length = this.load.type.fixture.length + this.load.type.oversizeHead + this.load.type.oversizeTail;

		return <ui-preview style={[
			cargoHeight.provide(ratio(
				length,
				this.load.type.height
			)),
			cargoLoadColor.provide(hex(this.load.color)),
			cargoLoadLogoColor.provide(hex(this.load.logoColor))
		].join(';')}>
			{logo}

			{this.showIdentifier && <ui-identifier>
				{new CargoLoadIdentifierComponent(this.load.identifier)}
			</ui-identifier>}

			<ui-oversize ui-side='head' style={cargoOffset.provide(percentage(100 / length * this.load.type.oversizeHead))}></ui-oversize>
			<ui-oversize ui-side='tail' style={cargoOffset.provide(percentage(100 / length * this.load.type.oversizeTail))}></ui-oversize>
		</ui-preview>;
	}
}
