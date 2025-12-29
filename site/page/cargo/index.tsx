import { Component } from "@acryps/page";
import { CargoLoadSummaryModel, CargoService } from "../managed/services";
import { CargoLoadPreviewComponent } from "./preview";
import { goIcon } from "../.built/icons";
import { CargoLoadIdentifierComponent } from "../shared/cargo-load-identifier";

export class CargoPage extends Component {
	static shortcuts = ['cargo', 'c'];

	loads: CargoLoadSummaryModel[];

	async onload() {
		this.loads = await new CargoService().getLoads();
	}

	breadcrumb = 'Cargo';
	render(child) {
		if (child) {
			return <ui-cargo>
				{child}
			</ui-cargo>
		}

		return <ui-cargo>
			<ui-overview>
				<ui-hint>
					All {this.loads.length} exchangeable cargo containers are listed here.
				</ui-hint>

				<ui-loads>
					{this.loads.map(load => <ui-load ui-href={`load/${load.id}`}>
						{new CargoLoadPreviewComponent(load)}

						<ui-detail>
							{new CargoLoadIdentifierComponent(load.identifier)}

							<ui-name>
								{load.type.name}
							</ui-name>
						</ui-detail>

						{load.railcar ? <ui-railcar ui-href={`/railcar/${load.railcar.tag}`}>
							<ui-name>
								Mounted on {load.railcar.model.name} {load.railcar.runningNumber}
							</ui-name>

							{goIcon()}
						</ui-railcar> : <ui-idle>
							Not Mounted
						</ui-idle>}
					</ui-load>)}
				</ui-loads>
			</ui-overview>
		</ui-cargo>
	}
}
