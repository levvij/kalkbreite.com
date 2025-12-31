import { Component } from "@acryps/page";
import { CaptureViewModel, RailcarService } from "../../managed/services";
import { Application } from "../..";

export class CapturesPage extends Component {
	captures: CaptureViewModel[];

	async onload() {
		this.captures = await new RailcarService().getLatestCaptures();

		this.captures = [
			...this.captures.filter(capture => capture.captured == null),
			...this.captures.filter(capture => capture.captured != null)
		];
	}

	breadcrumb = 'Captures';
	render() {
		console.log(this.captures[0].corrupted)

		return <ui-captures>
			<ui-hint>
				There is an automatic capturing station on the layout that creates images of every passing train.
				Here are all {this.captures.length} captures ever recorded, ordered by date.
				Tap to view/download them in full resolution.
				Any image on this page can be freely used.
			</ui-hint>

			<ui-captures>
				{this.captures.map(capture => <ui-capture>
					<ui-header>
						<ui-date>
							{capture.captured?.toLocaleString()}
						</ui-date>

						<ui-direction>
							{capture.direction ? 'Forward' : 'Reverse'}
						</ui-direction>
					</ui-header>

					<ui-image ui-click={() => open(`/capture/${capture.id}/full`)}>
						<img src={`/capture/${capture.id}`} loading='lazy' />
					</ui-image>

					{Application.session.account && <ui-actions>
						{capture.corrupted == null && <ui-action>
							Corrupted
						</ui-action>}

						{capture.corrupted == null && <ui-action>
							Useable
						</ui-action>}
					</ui-actions>}
				</ui-capture>)}
			</ui-captures>
		</ui-captures>
	}
}
