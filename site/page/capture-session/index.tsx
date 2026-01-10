import { Component } from "@acryps/page";
import { CaptureService, CaptureSessionViewModel } from "../managed/services";
import { CaptureSessionComponent } from "./session";

export class CaptureSessionsPage extends Component {
	sessions: CaptureSessionViewModel[];

	async onload() {
		this.sessions = await new CaptureService().listFreshCaptures();
	}

	breadcrumb = 'Capture Sessions';
	render(child) {
		return <ui-capture-sessions>
			{child ?? <ui-overview>
				<ui-hint>
					Here are the latest unreviewed capture sessions.
				</ui-hint>

				<ui-sessions>
					{this.sessions.map(session => new CaptureSessionComponent(session))}
				</ui-sessions>
			</ui-overview>}
		</ui-capture-sessions>
	}
}
