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
				{this.trains.map(train => <ui-train>
					<ui-detail>
						<ui-identifier>
							{train.identifier}
						</ui-identifier>

						<ui-type>
							{train.length == 1 ? 'S' : train.length}
						</ui-type>

						<ui-changed>
							{train.changed.toISOString().replace('T', ' ').replace(/\.[0-9]+Z$/, '')}
						</ui-changed>
					</ui-detail>

					<ui-capture>
						<img ui-href={train.identifier} src={`/capture/train/${train.identifier}`} loading='lazy' />
					</ui-capture>
				</ui-train>)}
			</ui-list>
		</ui-trains>
	}
}
