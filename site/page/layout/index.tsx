import { Component } from "@acryps/page";
import { LayoutLoader } from "../shared/layout/loader";
import { Layout, Section, SectionPosition } from "@packtrack/layout";
import { LayoutComponent } from "../shared/layout";
import { legendItemColor } from "./index.style";
import { primaryColor, trainOccupiedColor } from "../index.style";
import { LastTrainHeadPositionViewModel, TrainService, TrainViewModel } from "../managed/services";
import { LayoutMarker } from "../shared/layout/marker";

export class LayoutPage extends Component {
	layout: Layout;
	renderer: LayoutComponent;

	trainMarkers: LayoutMarker[] = [];

	async onload() {
		this.layout = await LayoutLoader.load();
	}

	breadcrumb = 'Layout';
	render(child) {
		if (child) {
			return <ui-layout>
				{child}
			</ui-layout>;
		}

		this.renderer = new LayoutComponent();
		this.renderer.onSectionClick = position => this.navigate(`section/${position.section.domainName}`);

		this.updateTrains();

		return <ui-layout>
			<ui-overview>
				{this.renderer}

				<ui-legend>
					<ui-item>
						<ui-color style={legendItemColor.provide('currentColor')}></ui-color>

						<ui-name>
							Track
						</ui-name>
					</ui-item>

					<ui-item>
						<ui-color style={legendItemColor.provide(primaryColor)}></ui-color>

						<ui-name>
							Highlighted Section
						</ui-name>
					</ui-item>
				</ui-legend>
			</ui-overview>
		</ui-layout>
	}

	async updateTrains() {
		const trains = await new TrainService().getLastTrainPositions();

		for (let marker of this.trainMarkers) {
			marker.remove();
		}

		for (let train of trains) {
			let section: Section;

			for (let district of this.layout.allDistricts) {
				for (let peer of district.sections) {
					if (peer.domainName == train.section) {
						section = peer;
					}
				}
			}

			if (!section) {
				continue;
			}

			const head = new SectionPosition(section, train.offset, train.reversed);
			const tail = head.advance(-train.coupledLength);

			const mark = this.renderer.mark(trainOccupiedColor, head, tail);
			mark.onClick = () => this.navigate(`/train/${train.trainIdentifier}`);

			this.trainMarkers.push(mark);
		}
	}
}
