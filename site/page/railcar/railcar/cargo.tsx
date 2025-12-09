import { Component } from "@acryps/page";
import { RailcarPage } from ".";
import { RailcarCargoLoadViewModel } from "../../managed/services";
import { hex, percentage, ratio } from "@acryps/style";
import { cargoLength, cargoOffset } from "../../model/index.style";
import { cargoBaseline, cargoHeight, cargoLoadColor, cargoLoadLogoColor } from "./index.style";

export class RailcarCargoComponent extends Component {
	declare parent: RailcarPage;

	height: number;

	render() {
		this.height = Math.max(...this.parent.railcar.cargoLoads.map(load => load.type.height + load.slot.baseline));

		return <ui-cargo
			style={cargoHeight.provide(ratio(this.parent.railcar.model.lengthIncludingBuffers, this.height))}
		>
			<ui-bay>
				{this.parent.railcar.cargoLoads.map(load => this.renderLoad(load))}
			</ui-bay>

			<ui-base>
				<ui-length>
					{this.parent.railcar.model.lengthIncludingBuffers.toFixed(1)}m
				</ui-length>
			</ui-base>
		</ui-cargo>
	}

	renderLoad(load: RailcarCargoLoadViewModel) {
		const length = (load.slot.fixture.length + load.type.oversizeHead + load.type.oversizeTail);

		const logo: HTMLElement = <ui-logo></ui-logo>;
		logo.style.mask = `url('/company/logo/${load.owner.id}') no-repeat center / contain`;

		return <ui-load style={[
			cargoOffset.provide(percentage(100 / this.parent.railcar.model.lengthIncludingBuffers * load.slot.offset)),
			cargoLength.provide(percentage(100 / this.parent.railcar.model.lengthIncludingBuffers * load.slot.fixture.length))
		].join(';')}>
			<ui-fixture>
				<ui-name>
					{load.slot.fixture.name}
				</ui-name>

				<ui-length>
					{load.slot.fixture.length.toFixed(1)}m
				</ui-length>
			</ui-fixture>

			<ui-load style={[
				cargoOffset.provide(percentage(100 / load.slot.fixture.length * -load.type.oversizeHead)),
				cargoLength.provide(percentage(100 / load.slot.fixture.length * length)),

				cargoHeight.provide(ratio(length, load.type.height)),
				cargoBaseline.provide(percentage(100 / this.height * load.slot.baseline)),

				cargoLoadColor.provide(hex(load.color)),
				cargoLoadLogoColor.provide(hex(load.logoColor))
			].join(';')}>
				<ui-identifier>
					{load.identifier}
				</ui-identifier>

				{logo}

				<ui-detail>
					<ui-name>
						{load.type.name}
					</ui-name>

					<ui-length>
						{length.toFixed(1)}m
					</ui-length>
				</ui-detail>
			</ui-load>
		</ui-load>
	}
}
