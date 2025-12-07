import { Component } from "@acryps/page";
import { searchIcon } from "../../.built/icons";
import { SearchService } from "../../managed/services";

export class SearchComponent extends Component {
	field: HTMLInputElement = <input type='search' />;

	render() {
		this.field.onkeyup = event => {
			if (event.key == 'Enter') {
				this.search();
			}
		};

		window.onkeydown = () => {
			if (document.contains(this.field)) {
				this.field.focus();
			}
		}

		return <ui-search>
			{this.field}

			<ui-action ui-click={() => this.search()}>
				{searchIcon()}
			</ui-action>
		</ui-search>
	}

		async search() {
			const result = await new SearchService().search(this.field.value);

			if (result) {
				this.navigate(result);
			}
		}
}
