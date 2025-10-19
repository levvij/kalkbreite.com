import { Component } from "@acryps/page";
import { LayoutLoader } from "../shared/layout/loader";
import { Layout } from "@packtrack/layout";
import { LayoutComponent } from "../shared/layout";

export class LayoutPage extends Component {
	layout: Layout;

	async onload() {
		this.layout = await LayoutLoader.load();
	}

	breadcrumb = 'Layout';
	render(child) {
		if (child) {
			return <ui-layout>
				{child}
			</ui-layout>;
		}

		const layout = new LayoutComponent();
		layout.onSectionClick = position => this.navigate(`section/${position.section.domainName}`);

		return <ui-layout>
			{layout}
		</ui-layout>
	}
}
