import { Component } from "@acryps/page";
import { RailcarSummaryModel, TrainService } from "../../managed/services";
import { Application } from "../..";
import { coupleIcon, uncoupleIcon } from "../../assets/icons/managed";
import { TrainsPage } from "..";

export class TrainPage extends Component {
	declare parameters: { identifier };
	declare parent: TrainsPage;

	units: RailcarSummaryModel[];

	async onload() {
		this.units = await new TrainService().getTrain(this.parameters.identifier);
	}

	breadcrumb = () => `Train ${this.parameters.identifier}`;
	render(child) {
		if (child) {
			return <ui-train>
				{child}
			</ui-train>;
		}

		return <ui-train>
			<ui-identifier>
				{this.parameters.identifier}
			</ui-identifier>

			<ui-units>
				<ui-action ui-href='couple/head'>
					{coupleIcon()}
				</ui-action>

				{this.units.map((unit, index) => [
					<ui-unit ui-href={`/railcar/${unit.tag}`}>
						<img src={`/capture/railcar/${unit.id}/forward`} />

						<ui-tag>
							{unit.tag}
						</ui-tag>
					</ui-unit>,

					Application.session.account && index != this.units.length - 1 && <ui-action ui-click={async () => {
						await new TrainService().uncoupleAfter(unit.id);

						this.reload();
					}}>
						{uncoupleIcon()}
					</ui-action>
				])}

				<ui-action ui-href='couple/tail'>
					{coupleIcon()}
				</ui-action>
			</ui-units>
		</ui-train>
	}
}
