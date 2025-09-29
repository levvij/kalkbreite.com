import { DbContext } from "../managed/database";
import { ManagedServer } from "../managed/server";

export const registerRailcarModelDrawingInterface = (server: ManagedServer, database: DbContext) => {
	server.app.get('/railcar-model-drawing/:id', async (request, response) => {
		const drawing = await database.railcarModelDrawing.find(request.params.id);

		if (!drawing) {
			response.status(404).end();
		}

		response.contentType('image/svg+xml');
		response.end(drawing.image);
	});
};
