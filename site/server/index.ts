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
import { writeFile } from "fs/promises";
import { LayoutPlan } from "./layout-plan/interface";
import { registerRailcarModelDrawingInterface } from "./model/drawing";
import { LiveStreamer } from "./live/stream";
import { registerGraffitiInspirationCaptureInterface } from "./graffiti/inspiration.interface";
import { importTrainProductBrands } from "./operators/import-train-product-brand";
import { registerScanInterface } from "./scan/interface";
import { registerMonitorRelay } from "./monitor/interface";
import expressWs from "express-ws";
import { TrainChain } from "@packtrack/train";
import { ChainRestorer } from "./chain/restore";
import { Layout } from "@packtrack/layout";
import { LayoutLoader } from "./chain/layout";
import { registerExportInterface } from "./chain/export";
import { SearchManager } from "./search/term";
import { registerSearchTopics } from "./search/topics";

const streamCameras = process.env.STREAM_CAMERAS == 'ENABLE';

export class Application {
	static layout: Layout;

	static trainChain: TrainChain;
	static chainRestorer: ChainRestorer;

	static async main() {
		DbClient.connectedClient = new DbClient();
		await DbClient.connectedClient.connect();

		const server = new ManagedServer();
		const database = new DbContext(new RunContext());

		// load layout & chain
		this.layout = await new LayoutLoader().load();

		this.chainRestorer = new ChainRestorer(database);
		this.trainChain = await this.chainRestorer.importDatabase();
		this.trainChain.dump();

		// register search service
		const search = new SearchManager();
		registerSearchTopics(database, this.trainChain, search);

		search.scheduleIndexUpdate();

		// fill in missing thumbnails
		for (let capture of await database.capture.where(capture => capture.thumbnail == null).toArray()) {
			await updateThumbnail(capture);
		}

		server.app.use(cookieParser());

		server.app.use(async (request, response, next) => {
			const context = await RequestContext.create(request, response, database);
			server.createRunContext = () => context;

			next();
		});

		server.createInjector = (context: RequestContext) => new Inject({
			DbContext: database,
			Session: context.session,
			Authentication: context.authentication,
			SearchManager: search
		});

		server.use(new StaticFileRoute('/assets/icons', join(process.cwd(), '..', 'page', '.built', 'icons', 'font')));
		server.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
		server.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));

		server.use(new StaticFileRoute('/layout/source/', join(process.cwd(), '..', '..', 'layout')));

		expressWs(server.app);

		registerTagInterface(server);
		registerCaptureInterface(server, database);
		registerLogoInterface(server, database);
		registerStorageTagInterface(server);
		registerRailcarModelDrawingInterface(server, database);
		registerGraffitiInspirationCaptureInterface(server, database);
		registerScanInterface(server, database);
		registerMonitorRelay(server);
		registerExportInterface(server);

		if (streamCameras) {
			await LiveStreamer.start();

			for (let camera of await database.camera.toArray()) {
				const stream = new LiveStreamer(camera);
				stream.register(server);

				// wait with streaming between updates
				// the monitoring website needs quite some delay between sessions or it will not work
				setTimeout(() => stream.start(), 1000 * 60);
			}
		}

		server.prepareRoutes();

		server.app.use('*', (request, response) => response.sendFile(join(process.cwd(), '..', 'page', 'assets', 'index.html')));

		ViewModel.globalFetchingContext = database;

		const port = +process.env.PORT! || 8004;
		server.start(port);
	}
}

Application.main();
