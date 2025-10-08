import { Component } from "@acryps/page";
import { LayoutLoader } from "../shared/layout/loader";
import { Layout } from "@packtrack/layout";

export class LayoutPage extends Component {
	layout: Layout;

	async onload() {
		this.layout = await LayoutLoader.load();
	}

	breadcrumb = 'Layout';
	render(child) {
		return <ui-layout>
			{child}
		</ui-layout>
	}
}
