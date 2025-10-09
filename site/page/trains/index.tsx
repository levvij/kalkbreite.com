import { Component } from "@acryps/page";
import { TrainService, TrainViewModel } from "../managed/services";

export class TrainsPage extends Component {
	trains: TrainViewModel[];

	async onload() {
		this.trains = await new TrainService().getTrains();
	}

	breadcrumb = 'Trains';
	render(child) {
		if (child) {
			return <ui-trains>
				{child}
			</ui-trains>;
		}

		return <ui-trains>
			<ui-list>
				{this.trains.map(train => <ui-train ui-href={train.identifier}>
					<ui-identifier>
						{train.identifier}
					</ui-identifier>

					<ui-type>
						{train.length == 1 ? 'S' : '*'}
					</ui-type>

					<ui-changed>
						{train.changed.toISOString().replace('T', ' ').replace(/\.[0-9]+Z$/, '')}
					</ui-changed>

					<img src={`/capture/train/${train.identifier}`} />
				</ui-train>)}
			</ui-list>
		</ui-trains>
	}
}
