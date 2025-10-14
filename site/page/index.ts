import { Component, PathRouter, Router } from '@acryps/page';
import { registerDirectives } from '@acryps/page-default-directives';
import { PageComponent } from './page';
import { HomePage } from './home';
import { applicationStyle } from './page.style';
import { RailcarPage } from './railcar';
import { Service, SessionService, SessionViewModel } from './managed/services';
import { CompanyPage } from './company';
import { StorageContainerPage } from './storage-container';
import { PrintStorageContainerTagPage } from './storage-container/print';
import { GraffitiPage } from './graffiti';
import { AssignGraffitiBoundsPage } from './graffiti/assign';
import { ArtistPage } from './artist';
import { LoginPage } from './login';
import { RegisterGraffitiPage } from './railcar/register-graffiti';
import { GraffitiInspirationsPage } from './graffiti-inspirations';
import { GraffitiInspirationPage } from './graffiti-inspiration';
import { CaptureAnchorPage } from './railcar/anchor';
import { RailcarCouplerPage } from './railcar/coupler';
import { TrainPage } from './trains/train';
import { TrainsPage } from './trains';
import { CoupleTrainPage } from './trains/train/couple';
import { ModelPage } from './model';
import { LayoutPage } from './layout';
import { LayoutSectionPage } from './layout/section';
import { MaintenacePage } from './railcar/maintenance';

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

		this.router = new PathRouter(PageComponent
			.route('/home', HomePage)
			.route('/login', LoginPage)

			.route('/artist/:tag', ArtistPage)

			.route('/layout', LayoutPage
				.route('/section/:domainName', LayoutSectionPage)
			)

			.route('/railcar/:tag', RailcarPage
				.route('/anchor/:captureId', CaptureAnchorPage)
				.route('/register-graffiti', RegisterGraffitiPage)
				.route('/maintenance/:id', MaintenacePage)

				.route('/coupler/:direction', RailcarCouplerPage)
			)

			.route('/train', TrainsPage
				.route('/:identifier', TrainPage
					.route('/couple/:anchor', CoupleTrainPage)
				)
			)

			.route('/model/:tag', ModelPage)

			.route('/company/:tag', CompanyPage)

			.route('/storage-container/print', PrintStorageContainerTagPage)
			.route('/storage-container/:tag', StorageContainerPage)

			.route('/graffiti-inspiration', GraffitiInspirationsPage
				.route('/:id', GraffitiInspirationPage)
			)

			.route('/graffiti/:id', GraffitiPage
				.route('/assign/:captureId', AssignGraffitiBoundsPage)
			)
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
