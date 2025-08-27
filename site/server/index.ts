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
import cookieParser from 'cookie-parser';
import { RequestContext } from "./session/context";
import { TrainChain } from "./train/chain";

DbClient.connectedClient = new DbClient({});

DbClient.connectedClient.connect().then(async () => {
	const app = new ManagedServer();
	const database = new DbContext(new RunContext());


	const chain = new TrainChain();

	for (let railcar of await database.railcar.toArray()) {
		await chain.add(railcar);
	}

	chain.dump();

	for (let coupling of await database.coupling.orderByAscending(coupling => coupling.coupled).toArray()) {
		await chain.couple(coupling.sourceId, coupling.targetId);

		chain.dump();
	}







	// fill in missing thumbnails
	for (let capture of await database.capture.where(capture => capture.thumbnail == null).toArray()) {
		await updateThumbnail(capture);
	}

	app.app.use(cookieParser());

	app.app.use(async (request, response, next) => {
		const context = await RequestContext.create(request, response, database);
		app.createRunContext = () => context;

		next();
	});

	app.createInjector = (context: RequestContext) => new Inject({
		DbContext: database,
		Session: context.session,
		Authentication: context.authentication
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
