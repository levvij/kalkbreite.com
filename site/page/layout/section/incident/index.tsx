import { Component, ComponentContent } from "@acryps/page";
import { LayoutSectionPage } from "..";
import { SectionPosition } from "@packtrack/layout";
import { LayoutMarker } from "../../../shared/layout/marker";
import { markerColor, primaryColor } from "../../../index.style";

export abstract class ReportIncidentPage extends Component {
	declare parent: LayoutSectionPage;

	failed = new Date();
	position: SectionPosition;

	marker: LayoutMarker;

	render() {
		requestAnimationFrame(() => {
			this.parent.layout.onSectionClick = position => {
				if (this.marker) {
					this.marker.move(position);
				} else {
					this.marker = this.parent.layout.mark(markerColor, position);
				}

				this.position = position;
				this.update();
			};
		});

		return <ui-report-incident>
			{this.position && <ui-position>
				{this.position.offset}m
			</ui-position>}

			<ui-field>
				<label>Decoupled</label>

				<input type='datetime-local' $ui-value={this.failed}></input>
			</ui-field>

			{this.renderFields()}

			<ui-actions>
				<ui-action ui-click={async () => {
					await this.report();

					this.navigate('../..');
				}}>
					Report
				</ui-action>
			</ui-actions>
		</ui-report-incident>
	}

	abstract renderFields(): ComponentContent;
	abstract report(): Promise<void>;
}
