import { DbContext } from "../managed/database";
import { ManagedServer } from "../managed/server";

export const registerLogoInterface = (server: ManagedServer, database: DbContext) => {
	server.app.get('/company/:type/:id', async (request, response) => {
		const company = await database.company.find(request.params.id);

		const source = request.params.type == 'icon' ? company.icon : company.logo;
		const logo = await source.fetch();

		if (!logo) {
			response.status(404);
			response.end('not found');

			return;
		}

		response.contentType(logo.mimeType);
		response.end(logo.data);
	});
};
