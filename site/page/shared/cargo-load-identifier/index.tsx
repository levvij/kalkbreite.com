import { Component } from "@acryps/page";
import { is } from "@acryps/style";

export class CargoLoadIdentifierComponent extends Component {
	constructor(
		private identifier: string
	) {
		super();

		this.identifier = identifier?.toUpperCase().trim();
	}

	render() {
		if (!this.identifier) {
			return document.createComment('');
		}

		// ISO 6346
		const iso6346 = this.identifier.match(/^([A-Z]{4})([0-9]{6})([0-9])$/);

		if (iso6346) {
			const company = iso6346[1];
			const identifier = iso6346[2];
			const verification = iso6346[3];

			return <ui-cargo-load-identifier>
				<ui-company>
					{company}
				</ui-company>

				<ui-numbers>
					{identifier}
				</ui-numbers>

				<ui-verification>
					{verification}
				</ui-verification>
			</ui-cargo-load-identifier>
		}

		return <ui-cargo-load-identifier>
			<ui-identifier>
				{this.identifier}
			</ui-identifier>
		</ui-cargo-load-identifier>
	}
}
