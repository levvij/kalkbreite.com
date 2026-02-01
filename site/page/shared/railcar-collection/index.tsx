import { Component } from "@acryps/page";
import { RailcarSummaryModel } from "../../managed/services";
import { Filter, Filtering } from "../filter";
import { FilterContext } from "../filter/context";

export class RailcarCollectionComponent extends Component {
	constructor(
		private railcars: RailcarSummaryModel[],
		private filter: FilterContext<RailcarSummaryModel> = FilterContext.empty()
	) {
		super();

		filter.onChange = () => this.update();
	}

	render() {
		return <ui-railcars>
			<ui-filters>
				{this.filter.filters}
			</ui-filters>

			<ui-list>
				{this.filter.reduce(this.railcars).map(railcar => <ui-railcar ui-href={`/railcar/${railcar.tag}`}>
					<ui-header>
						<ui-name>
							{railcar.givenName || railcar.model?.name || '-'}
						</ui-name>

						<ui-tag>
							{railcar.tag}
						</ui-tag>
					</ui-header>

					<img src={`/capture/railcar/${railcar.id}`} loading='lazy' />

					<ui-tagline>
						<ui-running-number>
							{railcar.runningNumber}
						</ui-running-number>
					</ui-tagline>
				</ui-railcar>)}
			</ui-list>
		</ui-railcars>;
	}
}
