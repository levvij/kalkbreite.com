import { Component } from '@acryps/page';
import { Application } from '.';
import { BreadcrumbComponent } from './breadcrumb';
import { SearchComponent } from './shared/search';
import { searchIcon } from './.built/icons';
import { HomePage } from './home';

export class PageComponent extends Component {
	globalSearch: SearchComponent;
	globalSearchContainer: HTMLElement = <ui-global-search></ui-global-search>;

	render(child) {
		addEventListener('keydown', event => {
			if (this.child instanceof HomePage) {
				return;
			}

			// open if nothing is being edited
			if (event.key == ' ' && document.activeElement == document.body || document.activeElement == document.documentElement) {
				this.showSearch();

				event.preventDefault();
			}

			// remove search again if space is pressed again (toggle effect)
			if (event.key == ' ' && !this.globalSearch?.field.value.trim()) {
				this.removeSearch();
			}

			// remove when pressing escape
			if (event.key == 'Escape') {
				this.removeSearch();
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

					<ui-action ui-click={() => {
						if (this.child instanceof HomePage) {
							this.child.search.field.focus();
						} else {
							this.showSearch();
						}
					}}>
						{searchIcon()}
					</ui-action>
				</ui-content>
			</ui-navigation>

			{new BreadcrumbComponent(this)}

			{child}

			{this.globalSearchContainer}
		</ui-page>;
	}

	showSearch() {
		this.removeSearch();

		this.globalSearch = new SearchComponent(
			link => {
				this.navigate(link);

				this.removeSearch();
			},
			() => this.globalSearch?.remove()
		);

		this.globalSearch.router = this.router;
		this.globalSearch.host(this.globalSearchContainer);

		requestAnimationFrame(() => this.globalSearch.field.focus());
	}

	removeSearch() {
		this.globalSearchContainer.textContent = '';
	}
}
