import { Component } from "@acryps/page";
import { searchIcon } from "../../.built/icons";
import { SearchService } from "../../managed/services";

declare module "@acryps/page" {
	namespace Component {
		// names used in search to quickly find the page
		let shortcuts: string[];
	}
}

export class SearchComponent extends Component {
	declare rootNode: HTMLElement;

	field: HTMLInputElement = <input type='search' />;

	shortcuts = new Map<string, string>();

	constructor(
		private go: (link: string) => void,
		private blur = () => {}
	) {
		super();
	}

	onload() {
		for (let route of this.router['constructedRoutes']) {
			for (let shortcut of route.component.shortcuts ?? []) {
				if (this.shortcuts.has(shortcut)) {
					throw new Error(`Duplicate shortcut '${shortcut}'`);
				}

				this.shortcuts.set(shortcut, route.matchingPath);
			}
		}
	}

	render() {
		const shortcutPreview: HTMLElement = <ui-shortcut></ui-shortcut>;

		this.field.onkeyup = event => {
			if (event.key == 'Enter') {
				this.search();
			}

			const shortcut = this.shortcuts.get(this.field.value.trim());

			if (shortcut) {
				shortcutPreview.textContent = shortcut;
			} else {
				shortcutPreview.textContent = '';
			}
		}

		this.field.onblur = () => this.blur();

		addEventListener('keydown', () => {
			if (document.contains(this.field)) {
				this.field.focus();
			}
		});

		return <ui-search>
			<ui-field>
				{this.field}

				{shortcutPreview}
			</ui-field>

			<ui-action ui-click={() => this.search()}>
				{searchIcon()}
			</ui-action>
		</ui-search>
	}

		async search() {
			const shortcut = this.shortcuts.get(this.field.value.trim());

			if (shortcut) {
				this.go(shortcut);

				return;
			}

			const result = await new SearchService().search(this.field.value);

			if (result) {
				this.go(result);
			}
		}
}
