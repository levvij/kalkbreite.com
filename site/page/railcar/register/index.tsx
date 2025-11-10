import { Component } from "@acryps/page";
import { CompanyService, CompanySummaryModel, CouplerTypeSummaryModel, CouplerTypeViewModel, RailcarModelService, RailcarModelSummaryModel, RailcarService } from "../../managed/services";

export class RegisterRailcarPage extends Component {
	declare parameters: { tag };

	tag: string;
	name = '';
	runningNumber = '';
	aquired = new Date();
	price = 0;
	model: RailcarModelSummaryModel;

	manufactuer: CompanySummaryModel;
	owner: CompanySummaryModel;
	operator: CompanySummaryModel;

	headCoupler: CouplerTypeViewModel;
	tailCoupler: CouplerTypeViewModel;

	models: RailcarModelSummaryModel[];
	companies: CompanySummaryModel[];
	couplers: CouplerTypeViewModel[];

	async onload() {
		this.tag = this.parameters.tag;

		this.models = await new RailcarModelService().list();
		this.companies = await new CompanyService().list();
		this.couplers = await new RailcarService().getCouplerTypes();
	}

	breadcrumb = 'Register';
	render() {
		return <ui-register-railcar>
			<ui-field>
				<ui-label>Tag</ui-label>
				<input $ui-value={this.tag} />
			</ui-field>

			<ui-field>
				<ui-label>Name</ui-label>
				<input $ui-value={this.name} />
			</ui-field>

			<ui-field>
				<ui-label>Running Number</ui-label>
				<input $ui-value={this.runningNumber} />
			</ui-field>

			<ui-field>
				<ui-label>Aquired</ui-label>
				<input $ui-value={this.aquired} type='datetime-local' />
			</ui-field>

			<ui-field>
				<ui-label>Price</ui-label>
				<input $ui-value={this.price} type='number' />
			</ui-field>

			<ui-field>
				<ui-label>Model</ui-label>

				<select $ui-value={this.model}>
					{this.models.map(model => <option ui-value={model}>
						{model.shortname} - {model.name}
					</option>)}
				</select>
			</ui-field>

			{this.renderCompanyField('manufactuer', 'Manufacturer')}
			{this.renderCompanyField('owner', 'Owner')}
			{this.renderCompanyField('operator', 'Operator')}

			{this.renderCouplerField('headCoupler', 'Head Coupler')}
			{this.renderCouplerField('tailCoupler', 'Tail Coupler')}
			<ui-actions>
				<ui-action ui-click={async () => {
					await new RailcarService().register(
						this.tag,
						this.name,
						this.runningNumber,
						this.aquired,
						this.price,
						this.model.id,
						this.manufactuer.id,
						this.owner.id,
						this.operator.id,

						this.headCoupler?.id ?? null,
						this.tailCoupler?.id ?? null
					);

					this.navigate(`/railcar/${this.tag}`);
				}}>
					Register Railcar
				</ui-action>
			</ui-actions>
		</ui-register-railcar>
	}

	renderCompanyField(property: keyof this, label: string) {
		return <ui-field>
			<ui-label>{label}</ui-label>

			<select $ui-value={this[property]}>
				{this.companies.map(company => <option ui-value={company}>
					{company.name}
				</option>)}
			</select>
		</ui-field>
	}

	renderCouplerField(property: keyof this, label: string) {
		return <ui-field>
			<ui-label>{label}</ui-label>

			<select $ui-value={this[property]}>
				<option ui-value={null}>
					No Coupler
				</option>

				{this.couplers.map(coupler => <option ui-value={coupler}>
					{coupler.name}
				</option>)}
			</select>
		</ui-field>
	}
}
