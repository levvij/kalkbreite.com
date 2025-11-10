import { Component } from "@acryps/page";
import { RailcarPage } from "..";
import { SectionPosition } from "@packtrack/layout";
import { LayoutComponent } from "../../../shared/layout";
import { RailcarService } from "../../../managed/services";

export class ComissionRailcarPage extends Component {
	declare parent: RailcarPage;

	layout = new LayoutComponent();
	position: SectionPosition;

	render() {
		this.layout.onSectionClick = position => {
			this.position = position;

			this.update();
		}

		return <ui-comission>
			{this.layout}

			{this.position ? <ui-position>
				{this.position.section.domainName} @ {this.position.offset}
			</ui-position> : <ui-hint>
				Select position on map
			</ui-hint>}

			<ui-actions>
				{this.comission(false, 'Forward')}
				{this.comission(true, 'Reversed')}
			</ui-actions>
		</ui-comission>
	}

	comission(reversed: boolean, direction: string) {
		return this.position && <ui-action ui-click={async () => {
			const train = await new RailcarService().comission(this.parent.railcar.id, this.position.section.domainName, this.position.offset, reversed);

			this.navigate(`/train/${train}`);
		}}>
			Comission {direction}
		</ui-action>
	}
}
