import { Component } from "@acryps/page";
import { TrainPage } from "..";
import { Application } from "../../..";
import { RailcarDirection, TrainRailcarUnitViewModel, TrainService, TrainViewModel } from "../../../managed/services";
import { coupleIcon } from "../../../.built/icons";

export class CoupleTrainPage extends Component {
	declare parent: TrainPage;
	declare parameters: { anchor };

	trains: TrainViewModel[];

	sourceCouplerType: string;

	async onload() {
		this.trains = await new TrainService().getCoupleableTrains(this.parent.parameters.identifier, this.parameters.anchor);

		if (this.parameters.anchor == 'head') {
			this.sourceCouplerType = this.parent.train.headCouplerType;
		} else {
			this.sourceCouplerType = this.parent.train.tailCouplerType;
		}
	}

	breadcrumb = 'Couple';
	render() {
		return <ui-couple>
			<ui-source>
				<img src={`/capture/train/${this.parent.parameters.identifier}/${this.parameters.anchor == 'head' ? RailcarDirection.reverse : RailcarDirection.forward}`} />
			</ui-source>

			{coupleIcon()}

			<ui-trains>
				{this.trains
					.filter(train => train.identifier != this.parent.parameters.identifier)
					.map(train => <ui-train>
						<ui-identifier>
							{train.identifier}
						</ui-identifier>

						<ui-directions>
							{this.renderTrain(train, RailcarDirection.forward)}
							{this.renderTrain(train, RailcarDirection.reverse)}
						</ui-directions>
					</ui-train>
				)}
			</ui-trains>
		</ui-couple>;
	}

	renderTrain(train: TrainViewModel, direction: RailcarDirection) {
		const coupler = direction == RailcarDirection.forward ? train.headCouplerType : train.tailCouplerType;

		if (coupler != this.sourceCouplerType) {
			return;
		}

		return <ui-direction>
			<ui-side>
				{direction == RailcarDirection.forward ? 'H' : 'T'}
			</ui-side>

			<img
				src={`/capture/train/${train.identifier}/${direction}`}
				loading='lazy'

			 	ui-click={async () => {
					await new TrainService().couple(
						this.parent.parameters.identifier, this.parameters.anchor,
						train.identifier, direction == RailcarDirection.forward ? 'head' : 'tail'
					);

					this.parent.reload();
					this.navigate('../..');
				}}
			/>
		</ui-direction>;
	}
}
