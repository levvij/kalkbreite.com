import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { DbContext } from "./managed/database";
import { join } from "path";
import { DbClient, RunContext } from "vlquery";
import { registerCaptureInterface } from "./capture/interface";
import { registerTagInterface } from "./railcar/tag";
import { registerLogoInterface } from "./company/logo";
import { createServer } from "https";
import { readFileSync } from "fs";
import { updateThumbnail } from "./capture/thumbnail";
import { registerStorageTagInterface } from "./storage/tag";

DbClient.connectedClient = new DbClient({});

DbClient.connectedClient.connect().then(async () => {
	const app = new ManagedServer();
	const database = new DbContext(new RunContext());

	app.createInjector = context => new Inject({
		Context: context,
		DbContext: database
	});

	app.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
	app.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));

	registerTagInterface(app);
	registerCaptureInterface(app, database);
	registerLogoInterface(app, database);
	registerStorageTagInterface(app);

	app.prepareRoutes();

	app.app.use('*', (request, response) => response.sendFile(join(process.cwd(), '..', 'page', 'assets', 'index.html')));

	ViewModel.globalFetchingContext = database;

	const port = +process.env.PORT! || 8004;
	app.start(port);
});
