import { Router, PathRouter, Component } from "@acryps/page";
import { registerDirectives } from "@acryps/page-default-directives";
import { ArtistPage } from "./artist";
import { ArtistsPage } from "./artists";
import { CompanyPage } from "./company";
import { GraffitiPage } from "./graffiti";
import { GraffitiInspirationsPage } from "./graffiti-inspirations";
import { GraffitiInspirationPage } from "./graffiti-inspirations/inspiration";
import { AssignGraffitiBoundsPage } from "./graffiti/assign";
import { AssignGraffitiInspirationPage } from "./graffiti/assign-inspiration";
import { HomePage } from "./home";
import { LayoutPage } from "./layout";
import { LayoutSectionPage } from "./layout/section";
import { ReportCollisionIncidentPage } from "./layout/section/incident/collision";
import { ReportDecouplingIncidentPage } from "./layout/section/incident/decoupling";
import { ReportDerailmentIncidentPage } from "./layout/section/incident/derailment";
import { ReportPowerLossIncidentPage } from "./layout/section/incident/power-loss";
import { LivePage } from "./live";
import { LoginPage } from "./login";
import { SessionViewModel, Service, SessionService } from "./managed/services";
import { ModelPage } from "./model";
import { PageComponent } from "./page";
import { applicationStyle } from "./page.style";
import { RailcarsPage } from "./railcar";
import { RailcarPage } from "./railcar/railcar";
import { CaptureAnchorPage } from "./railcar/railcar/anchor";
import { RailcarCouplerPage } from "./railcar/railcar/coupler";
import { MaintenacePage } from "./railcar/railcar/maintenance";
import { RegisterGraffitiPage } from "./railcar/railcar/register-graffiti";
import { RegisterRailcarPage } from "./railcar/register";
import { ScanBridge } from "./scan";
import { StorageContainerPage } from "./storage-container";
import { PrintStorageContainerTagPage } from "./storage-container/print";
import { TrainsPage } from "./trains";
import { TrainPage } from "./trains/train";
import { CoupleTrainPage } from "./trains/train/couple";
import { AssignTrainLabelPage } from "./trains/train/label";
import { ComissionRailcarPage } from "./railcar/railcar/comission";

// injected by esbuild
declare const buildDate: string;
declare const buildCommit: string;

export class Application {
	static router: Router;

	static session: SessionViewModel;

	static async main() {
		Service.baseUrl = '/';

		if (location.pathname == '/') {
			location.pathname = '/home';
		}

		this.session = await new SessionService().getSession();

		if (this.session.account) {
			new ScanBridge();
		}

		this.router = new PathRouter(PageComponent
			.route('/home', HomePage)
			.route('/login', LoginPage)

			.route('/artist/:tag', ArtistPage)

			.route('/artists', ArtistsPage)

			.route('/layout', LayoutPage
				.route('/section/:domainName', LayoutSectionPage
					.route('/incident/decoupling', ReportDecouplingIncidentPage)
					.route('/incident/derailment', ReportDerailmentIncidentPage)
					.route('/incident/collision', ReportCollisionIncidentPage)
					.route('/incident/power-loss', ReportPowerLossIncidentPage)
				)
			)

			.route('/railcar', RailcarsPage
				.route('/register/:tag', RegisterRailcarPage)

				.route('/:tag', RailcarPage
					.route('/anchor/:captureId', CaptureAnchorPage)
					.route('/register-graffiti', RegisterGraffitiPage)
					.route('/maintenance/:id', MaintenacePage)
					.route('/comission', ComissionRailcarPage)

					.route('/coupler/:direction', RailcarCouplerPage)
				)
			)

			.route('/train', TrainsPage
				.route('/:identifier', TrainPage
					.route('/couple/:anchor', CoupleTrainPage)
					.route('/label', AssignTrainLabelPage)
				)
			)

			.route('/model/:tag', ModelPage)

			.route('/company/:tag', CompanyPage)

			.route('/storage-container/print', PrintStorageContainerTagPage)
			.route('/storage-container/:tag', StorageContainerPage)

			.route('/graffiti/inspiration', GraffitiInspirationsPage
				.route('/:id', GraffitiInspirationPage)
			)

			.route('/graffiti/:id', GraffitiPage
				.route('/assign/:captureId', AssignGraffitiBoundsPage)
				.route('/assign-inspiration', AssignGraffitiInspirationPage)
			)

			.route('/live', LivePage)
		);

		registerDirectives(Component, this.router);

		// load styles
		applicationStyle().apply();

		// render application
		this.router.host(document.body);

		// output build information
		console.group(`build ${buildCommit}`);
		console.log(`built ${buildDate}`);
		console.log('developed by acryps.com');
		console.groupEnd();
	}
}

Application.main();
