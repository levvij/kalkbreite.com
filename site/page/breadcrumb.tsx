import { Component } from "@acryps/page";
import { Application } from ".";

declare module "@acryps/page" {
	interface Component {
		// name in the breadcrum stack
		//
		// setting to true indicates to the breadcrumb component that it must be loaded first
		breadcrumb: string | (() => string) | (() => Promise<string>);
	}
}

export class BreadcrumbComponent extends Component {
	parts: string[];

	constructor(
		private page: Component
	) {
		super();

		Application.router.onroutechanged = () => {
			this.update();
		};
	}

	render() {
		this.parts = [];

		return <ui-breadcrumb>
			<ui-container>
				{this.renderNextSegment(this.page, 0)}
			</ui-container>
		</ui-breadcrumb>
	}

	renderNextSegment(root: Component, level: number) {
		const content = document.createTextNode('');

		const next = async () => {
			if (!root.rootNode) {
				return requestAnimationFrame(() => next());
			}

			let text: string;

			if (typeof root.breadcrumb == 'string') {
				text = root.breadcrumb;
			} else if (typeof root.breadcrumb == 'function') {
				text = await root.breadcrumb();
			}

			if (text) {
				content.textContent = text;
				this.parts[level] = text;
			} else {
				content.parentElement.remove();
			}

			if (root.child) {
				const parts = this.parts.filter(item => item).reverse().slice(0, 2);
				parts.push('Kalkbreite');

				document.title = parts.join(' - ');
			}
		}

		requestAnimationFrame(() => next());

		return <ui-layer>
			<ui-name ui-href={root.route.fullPath}>
				{content}
			</ui-name>

			{root.child && this.renderNextSegment(root.child, level + 1)}
		</ui-layer>
	}
}
