import { Component } from "@acryps/page";
import { TrainPage } from "..";
import { CompanyService, CompanySummaryModel, TrainLabelViewModel, TrainProductBrandSummaryModel, TrainService } from "../../../managed/services";
import { TrainLabelComponent } from "../../../shared/train-label";

export class AssignTrainLabelPage extends Component {
	declare parent: TrainPage;

	label: TrainLabelViewModel;

	productBrands: TrainProductBrandSummaryModel[];
	operators: CompanySummaryModel[];

	preview: TrainLabelComponent;

	async onload() {
		this.label = this.parent.label ?? new TrainLabelViewModel();

		this.productBrands = await new TrainService().getProductBrands();
		this.operators = await new CompanyService().list();
	}

	render() {
		return <ui-assign-label>
			<ui-label>
				{this.preview = new TrainLabelComponent(this.label)}
			</ui-label>

			<ui-field>
				<label>Name</label>
				<input $ui-value={this.label.label} ui-change={() => this.preview.update()} />
			</ui-field>

			<ui-field>
				<label>Product Brand</label>

				<select $ui-value={this.label.productBrand} ui-change={() => this.preview.update()}>
					<option ui-value={null}>
						No Brand
					</option>

					{this.productBrands.map(brand => <option ui-value={brand}>
						{brand.shortName} - {brand.name}
					</option>)}
				</select>
			</ui-field>

			<ui-field>
				<label>Operator</label>

				<select $ui-value={this.label.operator} ui-change={() => this.preview.update()}>
					<option ui-value={null}>
						No Operator
					</option>

					<option disabled></option>

					{this.operators.filter(operator => operator.trainPrefix).map(operator => <option ui-value={operator}>
						{operator.trainPrefix} - {operator.name} ({operator.shortname})
					</option>)}

					<option disabled></option>

					{this.operators.filter(operator => !operator.trainPrefix).map(operator => <option ui-value={operator}>
						{operator.name} ({operator.shortname})
					</option>)}
				</select>
			</ui-field>

			<ui-actions>
				<ui-action ui-click={async () => {
					this.parent.label = await new TrainService().assignLabel(
						this.parent.train.identifier,
						this.label.label,
						this.label.productBrand?.id ?? null,
						this.label.operator?.id ?? null
					);

					this.navigate('..');
				}}>
					Assign Label
				</ui-action>
			</ui-actions>
		</ui-assign-label>
	}
}
