import { Component } from "@acryps/page";
import { LayoutLoader } from "../shared/layout/loader";
import { Layout, PointPositioner, PowerDistrict, Section, SectionPosition } from "@packtrack/layout";
import { LayoutComponent } from "../shared/layout";
import { legendItemColor } from "./index.style";
import { primaryColor } from "../index.style";
import { CollisionIncidentViewModel, DecouplingIncidentViewModel, DerailingIncidentViewModel, IncidentService, LastTrainHeadPositionViewModel, PowerLossIncidentViewModel, TrainService, TrainViewModel } from "../managed/services";
import { LayoutMarker } from "../shared/layout/marker";
import { findMessageType, Message, MonitorTrainSpeedPermitMessage, TypedMessage } from "@packtrack/protocol";
import { LayoutTrainListComponent } from "./trains";
import { Snapshot, TrainChain, Train } from "@packtrack/train";
import { Incident, incidentColor, positionerColor, trainOccupiedColor } from "./layout.style";
import { ColorValue, hex, hsl, percentage, turn } from "@acryps/style";

export class LayoutPage extends Component {
	layout: Layout;
	chain: TrainChain;

	renderer = new LayoutComponent();
	trainMarkers = new Map<Train, LayoutMarker>();

	socket: WebSocket;

	incidents?: Incident[];
	powerDistricts: Map<PowerDistrict, ColorValue>;

	async onload() {
		this.layout = await LayoutLoader.load();

		this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/monitor/listen`);

		const router = this.createMessageRouter();

		this.socket.onmessage = event => {
			const snapshotDocument = new DOMParser().parseFromString(event.data, 'application/xml');
			this.chain = Snapshot.import(snapshotDocument.querySelector('snapshot'), this.layout);
			this.chain.dump();

			for (let train of this.chain.trains) {
				this.trainMarkers.set(train, this.renderer.mark(trainOccupiedColor, train.head.nominal, train.tail.nominal));
			}

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

			this.trainMarkers.get(train).move(train.head.nominal, train.tail.nominal);

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

		if (this.incidents) {
			for (let incident of this.incidents) {
				this.renderer.mark(
					incidentColor.get(incident.constructor as any).color,

					new SectionPosition(
						this.renderer.findSection(incident.section),
						incident.position,
						false
					)
				);
			}
		}

		if (this.powerDistricts) {
			for (let district of this.layout.allDistricts) {
				for (let section of district.sections) {
					if (section.powerDistrict) {
						const marker = this.renderer.mark(
							this.powerDistricts.get(section.powerDistrict) ?? hex('f0f'),
							new SectionPosition(section, 0, false),
							new SectionPosition(section, section.length, false)
						);

						marker.onClick = () => this.navigate(`section/${section.domainName}`);
					}
				}
			}
		}

		return <ui-layout>
			<ui-overview>
				<ui-actions>
					<ui-action ui-click={async () => {
						this.incidents = [
							...await new IncidentService().getDecouplingIncidents(),
							...await new IncidentService().getDerailingIncidents(),
							...await new IncidentService().getCollisionIncidents(),
							...await new IncidentService().getPowerLossIncidents()
						];

						this.update();
					}}>
						Show Incidents
					</ui-action>

					<ui-action ui-click={() => {
						this.powerDistricts = new Map<PowerDistrict, ColorValue>();

						for (let district of this.layout.allDistricts) {
							for (let powerDistrict of district.powerDistricts) {
								this.powerDistricts.set(powerDistrict, null);
							}
						}

						for (let powerDistrict of this.powerDistricts.keys()) {
							this.powerDistricts.set(powerDistrict, hsl(
								turn(1 / this.powerDistricts.size * [...this.powerDistricts.keys()].indexOf(powerDistrict)),
								percentage(100),
								percentage(50)
							));
						}

						this.update();
					}}>
						Show Power Districts
					</ui-action>
				</ui-actions>

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

					{this.incidents && [...incidentColor.entries().map(([type, display]) => <ui-item>
						<ui-color style={legendItemColor.provide(display.color)}></ui-color>

						<ui-detail>
							<ui-name>
								{display.label}
							</ui-name>

							<ui-description>
								{this.incidents.filter(incident => incident.constructor as any == type).length} Reported incidents
							</ui-description>
						</ui-detail>
					</ui-item>)]}

					{this.powerDistricts && [...this.powerDistricts.entries().map(([district, color]) => <ui-item>
						<ui-color style={legendItemColor.provide(color)}></ui-color>

						<ui-detail>
							<ui-name>
								{district.name}
							</ui-name>

							<ui-description>
								Power district
							</ui-description>
						</ui-detail>
					</ui-item>)]}
				</ui-legend>
			</ui-overview>
		</ui-layout>
	}
}
