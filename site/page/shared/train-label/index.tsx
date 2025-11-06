import { Component } from "@acryps/page";
import { TrainLabelViewModel } from "../../managed/services";

export class TrainLabelComponent extends Component {
	constructor(
		private label: TrainLabelViewModel
	) {
		super();
	}

	render() {
		return <ui-train-label>
			{this.label.productBrand?.icon && <img src={URL.createObjectURL(new Blob([this.label.productBrand.icon], { type: 'image/svg+xml' }))} />}

			<ui-name>
				{this.label.label}
			</ui-name>

			<ui-operator>
				{this.label.operator && <img src={`/company/icon/${this.label.operator.id}`} />}
			</ui-operator>
		</ui-train-label>
	}
}
