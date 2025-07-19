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

// injected by esbuild
declare const buildDate: string;
declare const buildCommit: string;

export class Application {
	static router: Router;

	static async main() {
		Service.baseUrl = '/';

		this.router = new PathRouter(PageComponent
			.route('/', HomePage)

			.route('/railcar/:tag', RailcarPage)
			.route('/company/:id', CompanyPage)

			.route('/storage-container/print', PrintStorageContainerTagPage)
			.route('/storage-container/:tag', StorageContainerPage)
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
