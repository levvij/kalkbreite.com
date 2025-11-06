import { Component } from "@acryps/page";
import { MonitorTrainSpeedPermitMessage } from "@packtrack/protocol";
import { SpeedPermit, Train } from "@packtrack/train";

export class LayoutTrainListComponent extends Component {
	trains: Train[] = [];

	permit(message: MonitorTrainSpeedPermitMessage) {
		let train = this.trains.find(train => train.name == message.headers.train);

		if (!train) {
			train = new Train(message.headers.train as string, null, null, false);
			this.trains.push(train);
		}

		train.permit(+message.headers.speed, new Date(message.headers.issued as string));
	}

	render() {
		requestAnimationFrame(() => {
			if (document.contains(this.rootNode)) {
				this.update();
			};
		});

		return <ui-trains>
			{this.trains.map(train => <ui-train>
				{train.name} {train.currentSpeed * 3.6}km/h
			</ui-train>)}
		</ui-trains>
	}
}
