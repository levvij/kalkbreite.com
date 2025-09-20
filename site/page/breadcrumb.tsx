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
	constructor(
		private page: Component
	) {
		super();

		Application.router.onroutechanged = () => {
			this.update();
		};
	}

	render() {
		return <ui-breadcrumb>
			{this.renderNextSegment(this.page)}
		</ui-breadcrumb>
	}

	renderNextSegment(root: Component) {
		const content = document.createTextNode('');

		const next = async () => {
			if (!root.rootNode) {
				return requestAnimationFrame(() => next());
			}

			if (typeof root.breadcrumb == 'string') {
				content.textContent = root.breadcrumb;
			} else if (typeof root.breadcrumb == 'function') {
				content.textContent = await root.breadcrumb();
			}
		}

		next();

		return <ui-layer>
			<ui-name ui-href={root.route.fullPath}>
				{content}
			</ui-name>

			{root.child && this.renderNextSegment(root.child)}
		</ui-layer>
	}
}
