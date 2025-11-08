import { Component } from "@acryps/page";
import { LayoutLoader } from "../shared/layout/loader";
import { Layout, PointPositioner, Section, SectionPosition } from "@packtrack/layout";
import { LayoutComponent } from "../shared/layout";
import { legendItemColor } from "./index.style";
import { positionerColor, primaryColor, trainOccupiedColor } from "../index.style";
import { LastTrainHeadPositionViewModel, TrainService, TrainViewModel } from "../managed/services";
import { LayoutMarker } from "../shared/layout/marker";
import { findMessageType, Message, MonitorTrainSpeedPermitMessage, TypedMessage } from "@packtrack/protocol";
import { LayoutTrainListComponent } from "./trains";
import { Snapshot, TrainChain } from "@packtrack/train";

export class LayoutPage extends Component {
	layout: Layout;
	chain: TrainChain;

	renderer: LayoutComponent;

	socket: WebSocket;

	trainList = new LayoutTrainListComponent();

	async onload() {
		this.layout = await LayoutLoader.load();

		this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/monitor/listen`);

		const router = this.createMessageRouter();

		this.socket.onmessage = event => {
			const snapshotDocument = new DOMParser().parseFromString(event.data, 'application/xml');
			this.chain = Snapshot.import(snapshotDocument.querySelector('snapshot'), this.layout);
			this.chain.dump();

			this.trainList.chain = this.chain;

			this.socket.onmessage = async event => {
				const buffer = new Uint8Array(await (event.data as Blob).arrayBuffer());
				const message = Message.from(buffer);

				const type = findMessageType(message);

				if (!type) {
					console.warn(`message type '${message.route.join('/')}' not found`);

					return;
				}

				const handler = router.get(type);

				if (!handler) {
					console.warn(`message type '${message.route.join('/')}' not supported`);

					return;
				}

				handler(message);
			};
		};
	}

	createMessageRouter() {
		const router = new Map<any, (message: TypedMessage) => void>();

		router.set(MonitorTrainSpeedPermitMessage, message => {
			const train = this.chain.trains.find(train => train.identifier == message.headers.train);

			train.permit(
				+message.headers.speed,
				new Date(message.headers.issued as string)
			);
		});

		return router;
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

		for (let district of this.layout.allDistricts) {
			for (let section of district.sections) {
				let offset = 0;

				for (let track of section.tracks) {
					for (let positioner of track.positioners) {
						if (positioner instanceof PointPositioner) {
							this.renderer.mark(positionerColor, positioner.position);
						}
					}
				}
			}
		}

		return <ui-layout>
			<ui-overview>
				{this.renderer}

				<ui-legend>
					<ui-item>
						<ui-color style={legendItemColor.provide('currentColor')}></ui-color>

						<ui-detail>
							<ui-name>
								Track
							</ui-name>

							<ui-description>
								A section of rail.
								Beware that the diagram is not to scale.
							</ui-description>
						</ui-detail>
					</ui-item>

					<ui-item>
						<ui-color style={legendItemColor.provide(primaryColor)}></ui-color>

						<ui-detail>
							<ui-name>
								Highlighted Section
							</ui-name>

							<ui-description>
								Hover over a section to highlight it.
								Click to view more details.
							</ui-description>
						</ui-detail>
					</ui-item>

					<ui-item>
						<ui-color style={legendItemColor.provide(positionerColor)}></ui-color>

						<ui-detail>
							<ui-name>
								Positioner
							</ui-name>

							<ui-description>
								Reports whenever a train runs over it.
								Used to locate trains.
							</ui-description>
						</ui-detail>
					</ui-item>
				</ui-legend>

				{this.trainList}
			</ui-overview>
		</ui-layout>
	}
}
