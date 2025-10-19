import { Component } from "@acryps/page";
import { TrainPage } from "..";
import { Application } from "../../..";
import { coupleIcon } from "../../../assets/icons/managed";
import { RailcarDirection, TrainService, TrainViewModel } from "../../../managed/services";

export class CoupleTrainPage extends Component {
	declare parent: TrainPage;
	declare parameters: { anchor };

	breadcrumb = 'Couple';
	render() {
		const sourceUnit = this.parameters.anchor == 'head' ? this.parent.units.at(0) : this.parent.units.at(-1);

		return <ui-couple>
			<ui-source>
				<img src={`/capture/railcar/${sourceUnit.id}/forward`} />
			</ui-source>

			{coupleIcon()}

			<ui-trains>
				{this.parent.parent.trains
					.filter(train => train.identifier != this.parent.parameters.identifier)
					.map(train => [
						this.renderTrain(train, RailcarDirection.forward),
						this.renderTrain(train, RailcarDirection.reverse)
					]
				)}
			</ui-trains>
		</ui-couple>;
	}

	renderTrain(train: TrainViewModel, direction: RailcarDirection) {
		return <ui-train ui-click={async () => {
			await new TrainService().couple(
				this.parent.parameters.identifier, this.parameters.anchor,
				train.identifier, direction == RailcarDirection.forward ? 'head' : 'tail'
			);

			this.navigate('../..');
		}}>
			<ui-identifier>
				{train.identifier}
			</ui-identifier>

			<img src={`/capture/train/${train.identifier}/${direction}`} />
		</ui-train>;
	}
}
