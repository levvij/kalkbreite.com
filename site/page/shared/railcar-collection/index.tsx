import { Component } from "@acryps/page";
import { RailcarSummaryModel } from "../../managed/services";

export class RailcarCollectionComponent extends Component {
	constructor(
		private railcars: RailcarSummaryModel[]
	) {
		super();
	}

	render() {
		return <ui-railcars>
			{this.railcars.map(railcar => <ui-railcar ui-href={`/railcar/${railcar.tag}`}>
				<img src={`/capture/railcar/${railcar.id}`} />

				<ui-header>
					<ui-name>
						{railcar.givenName ?? railcar.model?.name ?? '-'}
					</ui-name>

					<ui-tag>
						{railcar.tag}
					</ui-tag>
				</ui-header>

				<ui-running-number>
					{railcar.runningNumber}
				</ui-running-number>
			</ui-railcar>)}
		</ui-railcars>;
	}
}
