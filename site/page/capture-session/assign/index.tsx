import { Component } from "@acryps/page";
import { CaptureSessionsPage } from "..";
import { CaptureService, CaptureSessionViewModel, RailcarDirection, RailcarSummaryModel } from "../../managed/services";
import { TopOffset, url } from "@acryps/style";
import { bufferAnchorOffset } from "../../railcar/railcar/index.style";
import { RailcarSelect } from "../../shared/railcar-select";
import { railcarSideSelectStyle } from "../../shared/railcar-side-select/index.style";
import { RailcarSideSelect } from "../../shared/railcar-side-select";

export class CaptureSessionAssignPage extends Component {
	declare parent: CaptureSessionsPage;
	declare parameters: { sessionId, offset };

	session: CaptureSessionViewModel;

	railcar: RailcarSummaryModel;
	side: RailcarDirection;

	async onload() {
		this.session = this.parent.sessions.find(session => session.id == this.parameters.sessionId);
	}

	render() {
		const offset = +`0.${this.parameters.offset}`;

		const image = new Image();
		image.src = `/capture/session/${this.session.id}`;

		image.onload = () => {
			image.style.setProperty(bufferAnchorOffset.propertyName, `${image.naturalWidth / image.naturalHeight * offset}`);
		};

		return <ui-assign>
			<ui-image>
				<ui-container>
					{image}
				</ui-container>
			</ui-image>

			<ui-form>
				<ui-offset>
					+{offset}
				</ui-offset>

				{new RailcarSideSelect(this.railcar, (railcar, side) => {
					this.railcar = railcar;
					this.side = side;
				})}

				<ui-actions>
					<ui-action ui-click={async () => {
						new CaptureService().assign(this.session.id, offset, this.railcar.id, this.side);

						this.navigate('../../..');
					}}>
						Assign Capture
					</ui-action>
				</ui-actions>
			</ui-form>
		</ui-assign>
	}
}
