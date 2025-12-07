import { Component } from "@acryps/page";
import { CameraViewModel, LiveService } from "../managed/services";

export class LivePage extends Component {
	static shortcuts = ['live'];

	cameras: CameraViewModel[];

	async onload() {
		this.cameras = await new LiveService().getCameras();
	}

	render() {
		return <ui-live>
			<ui-cameras>
				{this.cameras.map(camera => <ui-camera>
					<img src={`/stream/${camera.id}`} />

					<ui-name>
						{camera.name}
					</ui-name>
				</ui-camera>)}
			</ui-cameras>
		</ui-live>
	}
}
