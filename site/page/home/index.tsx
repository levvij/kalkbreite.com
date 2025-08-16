import { Component } from "@acryps/page";
import { RailcarService, RailcarSummaryModel } from "../managed/services";
import { ReaderComponent } from "./reader";
import { RailcarCollectionComponent } from "../shared/railcar-collection";
import { SlideshowComponent } from "../shared/slideshow";
import { Application } from "..";

export class HomePage extends Component {
	railcars: RailcarSummaryModel[];

	async onload() {
		this.railcars = await new RailcarService().list();

		let textBuffer = '';
		let textBufferReset = setTimeout(() => {});

		onkeypress = event => {
			clearTimeout(textBufferReset);
			textBufferReset = setTimeout(() => textBuffer = '', 500);

			if (document.contains(this.rootNode)) {
				if (event.key == 'Enter') {
					this.navigate(`/railcar/${textBuffer}`);
				} else if (/^[0-9a-z]$/.test(event.key)) {
					textBuffer += event.key;
				}
			}
		};
	}

	render() {
		return <ui-home>
			{new SlideshowComponent(() => '/capture/random')}

			<ui-content>
				<ui-guide>
					Welcome to Kalkbreite Model Railway. A playground for railway operations, electronics, software and street art.
				</ui-guide>

				{Application.session.account && <ui-actions>
					{new ReaderComponent()}
				</ui-actions>}

				{new RailcarCollectionComponent(this.railcars)}
			</ui-content>
		</ui-home>
	}
}
