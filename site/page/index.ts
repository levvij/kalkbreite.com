import { Router, PathRouter, Component } from "@acryps/page";
import { registerDirectives } from "@acryps/page-default-directives";
import { ArtistPage } from "./artist/artist";
import { ArtistsPage } from "./artist";
import { CompanyPage } from "./company";
import { GraffitiPage } from "./graffiti/graffiti";
import { AssignGraffitiBoundsPage } from "./graffiti/graffiti/assign";
import { AssignGraffitiInspirationPage } from "./graffiti/graffiti/assign-inspiration";
import { HomePage } from "./home";
import { LayoutPage } from "./layout";
import { LayoutSectionPage } from "./layout/section";
import { ReportCollisionIncidentPage } from "./layout/section/incident/collision";
import { ReportDecouplingIncidentPage } from "./layout/section/incident/decoupling";
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
import { ReportDerailingIncidentPage } from "./layout/section/incident/derailing";
import { PowerDistrictPage } from "./layout/power-district";
import { GraffitisPage } from "./graffiti";
import { GraffitiInspirationsPage } from "./graffiti/inspirations";
import { GraffitiInspirationPage } from "./graffiti/inspirations/inspiration";
import { CargoPage } from "./cargo";
import { CargoLoadPage } from "./cargo/load";
import { CapturesPage } from "./railcar/capture";

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

			.route('/artist', ArtistsPage
				.route('/:tag', ArtistPage)
			)

			.route('/cargo', CargoPage
				.route('/load/:id', CargoLoadPage)
			)

			.route('/layout', LayoutPage
				.route('/section/:domainName', LayoutSectionPage
					.route('/incident/decoupling', ReportDecouplingIncidentPage)
					.route('/incident/derailing', ReportDerailingIncidentPage)
					.route('/incident/collision', ReportCollisionIncidentPage)
					.route('/incident/power-loss', ReportPowerLossIncidentPage)
				)

				.route('/power-district/:domainName', PowerDistrictPage)
			)

			.route('/railcar', RailcarsPage
				.route('/register/:tag', RegisterRailcarPage)

				.route('/captures', CapturesPage)

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

			.route('/graffiti', GraffitisPage
				.route('/inspiration', GraffitiInspirationsPage
					.route('/:id', GraffitiInspirationPage)
				)

				.route('/:id', GraffitiPage
					.route('/assign/:captureId', AssignGraffitiBoundsPage)
					.route('/assign-inspiration', AssignGraffitiInspirationPage)
				)
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
