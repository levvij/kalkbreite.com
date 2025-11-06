import expressWs, { WebsocketMethod } from "express-ws";
import { ManagedServer } from "../managed/server";
import { WebSocket } from "ws";
import 'express-ws';
import { scanRoutes } from "../../shared/scan";
import { DbContext, Railcar } from "../managed/database";
import { TrainChain } from "../train/chain";

export const registerScanInterface = (server: ManagedServer, database: DbContext, chain: TrainChain) => {
	const listeners: WebSocket[] = [];

	for (let route of scanRoutes) {
		server.app.get(`/scan/${route.source}/:tag`, async (request, response) => {
			const tag = request.params.tag;

			const railcar = await database.railcar.first(railcar => railcar.tag.valueOf() == tag);
			const model = await railcar?.model.fetch();
			const storageContainer = await railcar?.storageContainer.fetch();
			const train = chain.trains.find(train => train.units.find(unit => unit.railcar.tag == tag));
			const openMaintenanceJob = await railcar?.maintenanceJobs.where(job => job.completed == null).first();

			for (let listener of listeners) {
				listener.send(JSON.stringify({
					message: route.source,
					railcar: {
						tag,
						storageContainer: storageContainer?.tag,
						train: train?.identifier,
						openMaintenance: openMaintenanceJob?.id
					}
				}));
			}

			// sends railcar state to scanner module
			// will light up buttons accordingly
			response.json({
				tag,

				// display
				name: railcar?.givenName,
				model: model?.name,
				runningNumber: railcar?.runningNumber,

				// core buttons
				inTrain: train?.railcarCount > 1,
				inStorage: railcar?.stored,

				// building buttons
				// < not defined yet >

				// maintenance buttons
				hasOpenMaintenance: !!openMaintenanceJob,
				hasGraffiti: (await railcar?.graffitis.count()) > 0
			});
		});
	};

	(server.app as any).ws('/scan/listen', socket => {
		listeners.push(socket);

		socket.onclose = () => listeners.splice(listeners.indexOf(socket), 1);
	});
};
