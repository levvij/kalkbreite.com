import { Component } from "@acryps/page";
import { LayoutLoader } from "../shared/layout/loader";
import { Layout } from "@packtrack/layout";
import { LayoutComponent } from "../shared/layout";
import { legendItemColor } from "./index.style";
import { primaryColor } from "../index.style";

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
			<ui-overview>
				{layout}

				<ui-legend>
					<ui-item>
						<ui-color style={legendItemColor.provide('currentColor')}></ui-color>

						<ui-name>
							Track
						</ui-name>
					</ui-item>

					<ui-item>
						<ui-color style={legendItemColor.provide(primaryColor)}></ui-color>

						<ui-name>
							Highlighted Section
						</ui-name>
					</ui-item>
				</ui-legend>
			</ui-overview>
		</ui-layout>
	}
}
