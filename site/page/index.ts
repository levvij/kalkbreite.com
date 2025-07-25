import { Component, PathRouter, Router } from '@acryps/page';
import { registerDirectives } from '@acryps/page-default-directives';
import { PageComponent } from './page';
import { HomePage } from './home';
import { applicationStyle } from './page.style';
import { RailcarPage } from './railcar';
import { Service } from './managed/services';
import { CompanyPage } from './company';
import { StorageContainerPage } from './storage-container';
import { PrintStorageContainerTagPage } from './storage-container/print';
import { GraffitiPage } from './graffiti';
import { AssignGraffitiBoundsPage } from './graffiti/assign';
import { ArtistPage } from './artist';

// injected by esbuild
declare const buildDate: string;
declare const buildCommit: string;

export class Application {
	static router: Router;

	static async main() {
		Service.baseUrl = '/';

		if (location.pathname == '/') {
			location.pathname = '/home';
		}

		this.router = new PathRouter(PageComponent
			.route('/home', HomePage)

			.route('/artist/:tag', ArtistPage)

			.route('/railcar/:tag', RailcarPage)

			.route('/company/:tag', CompanyPage)

			.route('/storage-container/print', PrintStorageContainerTagPage)
			.route('/storage-container/:tag', StorageContainerPage)

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
