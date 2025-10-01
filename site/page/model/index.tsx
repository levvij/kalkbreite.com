import { Component } from "@acryps/page";
import { RailcarModelService, RailcarModelSummaryModel, RailcarModelViewModel, RailcarService, RailcarSummaryModel } from "../managed/services";
import { RailcarCollectionComponent } from "../shared/railcar-collection";
import { UicIdentifierComponent } from "./uic-identifier";

export class ModelPage extends Component {
	declare parameters: { tag };

	model: RailcarModelViewModel;
	railcars: RailcarSummaryModel[];

	async onload() {
		this.model = await new RailcarModelService().getModel(this.parameters.tag);
		this.railcars = await new RailcarModelService().getRailcars(this.model.id);
	}

	breadcrumb = () => `Railcar Model ${this.model.name}`;
	render() {
		return <ui-railcar-model>
			{this.model.drawings.map(drawing => <ui-technical-drawing>
				<img src={`/model/drawing/${drawing.id}`} />
			</ui-technical-drawing>)}

			<ui-name>
				{this.model.name}
			</ui-name>

			<ui-summary>
				{this.model.summary}
			</ui-summary>

			{this.model.uicIdentifier && new UicIdentifierComponent(this.model.uicIdentifier, this.model.uicLocale)}

			{new RailcarCollectionComponent(this.railcars)}
		</ui-railcar-model>
	}
}
