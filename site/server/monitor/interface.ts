import { Message } from "@packtrack/protocol";
import { ManagedServer } from "../managed/server";
import { JSDOM } from 'jsdom';
import { Application } from "..";
import { Snapshot } from "@packtrack/train";

export const registerMonitorRelay = (server: ManagedServer) => {
	const listeners: WebSocket[] = [];

	server.app.post('/relay/push', (request, response) => {
		const body = [];

		request.on('data', chunk => body.push(chunk));

		request.on('close', () => {
			if (listeners.length) {
				// repackage message for safety
				const message = Message.from(Buffer.concat(body));
				const buffer = message.toBuffer();

				console.log(`relaying '${message.route.join('/')}' (${buffer.byteLength}b) to ${listeners.length} listeners`);

				for (let listener of listeners) {
					listener.send(buffer);
				}
			}
		});
	});

	(server.app as any).ws('/monitor/listen', socket => {
		const snapshot = Snapshot.export(new JSDOM().window.document, Application.trainChain);
		socket.send(snapshot.outerHTML);

		listeners.push(socket);

		socket.onclose = () => listeners.splice(listeners.indexOf(socket), 1);
	});
};
