import { Application } from ".";
import { scanRoutes } from "../shared/scan";

export class ScanBridge {
	socket: WebSocket;

	constructor() {
		this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/scan/listen`);

		this.socket.onmessage = event => {
			const message = JSON.parse(event.data);
			const route = scanRoutes.find(route => route.source == message.message);

			if (!route) {
				return;
			}

			Application.router.navigate(route.target(message.railcar));
		};
	}
}
