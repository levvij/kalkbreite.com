import { Component } from "@acryps/page";
import { MonitorTrainSpeedPermitMessage } from "@packtrack/protocol";
import { SpeedPermit, Train, TrainChain } from "@packtrack/train";

export class LayoutTrainListComponent extends Component {
	chain: TrainChain;

	render() {
		requestAnimationFrame(() => {
			if (document.contains(this.rootNode)) {
				this.update();
			};
		});

		if (!this.chain) {
			return document.createComment('');
		}

		return <ui-trains>
			{this.chain.trains.map(train => <ui-train>
				{train.identifier} {train.currentSpeed * 3.6}km/h {train.head.nominal.toString()} {train.head.maximal.toString()}
			</ui-train>)}
		</ui-trains>
	}
}
