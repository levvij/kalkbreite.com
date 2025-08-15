import { Component } from "@acryps/page";
import { GraffitiCaptureViewModel, GraffitiViewModel } from "../managed/services";
import { crossesGraffiti } from "../../shared/cross-graffiti";

export class GraffitiCrossComponent extends Component {
	constructor(
		private graffiti: GraffitiViewModel
	) {
		super();
	}

	render() {
		if (!this.graffiti.captures[0]) {
			return document.createComment('');
		}

		const peers = this.graffiti.railcar.graffitis
			.filter(peer => peer.direction == this.graffiti.direction)
			.filter(peer => peer.id != this.graffiti.id)
			.filter(peer => peer.captures.length);

		const crosses = peers.filter(peer => crossesGraffiti(this.graffiti.captures[0], peer.captures[0]));

		if (!crosses.length) {
			return document.createComment('');
		}

		const first = crosses[0];

		return <ui-crosses>
			This graffiti has first been crossed on {first.painted.toLocaleDateString()} by {first.artist?.name ?? 'an unknown artist'}.
		</ui-crosses>
	}
}
