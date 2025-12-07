import { Component } from '@acryps/page';
import { Application } from '.';
import { BreadcrumbComponent } from './breadcrumb';
import { SearchComponent } from './shared/search';

export class PageComponent extends Component {
	render(child) {
		const globalSearch: HTMLElement = <ui-global-search></ui-global-search>;
		let search: SearchComponent;

		addEventListener('keydown', event => {
			// open if nothing is being edited
			if (event.key == ' ' && document.activeElement == document.body || document.activeElement == document.documentElement) {
				globalSearch.textContent = '';

				search = new SearchComponent(
					link => {
						this.navigate(link);

						globalSearch.textContent = '';
					},
					() => search?.remove()
				);

				search.router = this.router;
				search.host(globalSearch);

				requestAnimationFrame(() => search.field.focus());

				event.preventDefault();
			}

			// remove search again if space is pressed again (toggle effect)
			if (event.key == ' ' && !search?.field.value) {
				globalSearch.textContent = '';
			}

			// remove when pressing escape
			if (event.key == 'Escape') {
				globalSearch.textContent = '';
			}
		});

		return <ui-page>
			<ui-navigation>
				<ui-content>
					<ui-logo ui-href='/home'>
						Kalkbreite
					</ui-logo>

					{Application.session?.account ? <ui-account>
						{Application.session.account.name}
					</ui-account> : <ui-login ui-href='/login'>
						Login
					</ui-login>}
				</ui-content>
			</ui-navigation>

			{new BreadcrumbComponent(this)}

			{child}

			{globalSearch}
		</ui-page>;
	}
}
