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
import { writeFile } from "fs/promises";
import { LayoutPlan } from "./layout-plan/interface";
import { registerRailcarModelDrawingInterface } from "./model/drawing";
import { LiveStreamer } from "./live/stream";
import { registerGraffitiInspirationCaptureInterface } from "./graffiti/inspiration.interface";
import { importTrainProductBrands } from "./operators/import-train-product-brand";
import { registerScanInterface } from "./scan/interface";

const streamCameras = process.env.STREAM_CAMERAS == 'ENABLE';

DbClient.connectedClient = new DbClient({});

DbClient.connectedClient.connect().then(async () => {
	const app = new ManagedServer();
	const database = new DbContext(new RunContext());

	// load chain
	const chain = await TrainChain.restore(database);
	chain.dump();

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
		Authentication: context.authentication,
		TrainChain: chain
	});

	app.use(new StaticFileRoute('/assets/icons', join(process.cwd(), '..', 'page', '.built', 'icons', 'font')));
	app.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
	app.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));

	app.use(new StaticFileRoute('/layout/source/', join(process.cwd(), '..', '..', 'layout')));

	registerTagInterface(app);
	registerCaptureInterface(app, database, chain);
	registerLogoInterface(app, database);
	registerStorageTagInterface(app);
	registerRailcarModelDrawingInterface(app, database);
	registerGraffitiInspirationCaptureInterface(app, database);
	registerScanInterface(app, database, chain);

	if (streamCameras) {
		await LiveStreamer.start();

		for (let camera of await database.camera.toArray()) {
			const stream = new LiveStreamer(camera);
			stream.register(app);

			// wait with streaming between updates
			// the monitoring website needs quite some delay between sessions or it will not work
			setTimeout(() => stream.start(), 1000 * 60);
		}
	}

	app.prepareRoutes();

	app.app.use('*', (request, response) => response.sendFile(join(process.cwd(), '..', 'page', 'assets', 'index.html')));

	ViewModel.globalFetchingContext = database;

	const port = +process.env.PORT! || 8004;
	app.start(port);
});
