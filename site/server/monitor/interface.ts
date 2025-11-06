import { Message } from "@packtrack/protocol";
import { ManagedServer } from "../managed/server";

export const registerMonitorRelay = (server: ManagedServer) => {
	const listeners: WebSocket[] = [];

	server.app.post('/relay/push', (request, response) => {
		const body = [];

		request.on('data', chunk => body.push(chunk));

		request.on('close', () => {
			// repackage message for safety
			const message = Message.from(Buffer.concat(body));
			const buffer = message.toBuffer();

			console.log(`relaying '${message.route.join('/')}' (${buffer.byteLength}b) to ${listeners.length} listeners`);

			for (let listener of listeners) {
				listener.send(buffer);
			}
		});
	});

	(server.app as any).ws('/monitor/listen', socket => {
		listeners.push(socket);

		socket.onclose = () => listeners.splice(listeners.indexOf(socket), 1);
	});
};
