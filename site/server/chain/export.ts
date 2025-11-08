import { Snapshot } from "@packtrack/train";
import { Application } from "..";
import { DbContext } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { JSDOM } from 'jsdom';

export const registerExportInterface = (server: ManagedServer) => {
	server.app.get('/train-chain/export', (request, response) => {
		const snapshot = Snapshot.export(new JSDOM().window.document, Application.trainChain);

		response.contentType('application/xml');
		response.end(snapshot.outerHTML);
	});
};
