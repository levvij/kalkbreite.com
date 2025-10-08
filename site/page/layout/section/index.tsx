import { Component } from "@acryps/page";
import { District, Layout, Route, Router, Section } from "@packtrack/layout";
import { LayoutPage } from "..";
import { DetailSectionComponent } from "../../shared/detail-section";
import { LayoutComponent } from "../../shared/layout";

export class LayoutSectionPage extends Component {
	declare parameters: { domainName };
	declare parent: LayoutPage;

	section: Section;

	async onload() {
		for (let district of this.parent.layout.allDistricts) {
			for (let section of district.sections) {
				if (section.domainName == this.parameters.domainName) {
					this.section = section;

					return;
				}
			}
		}
	}

	breadcrumb = () => this.section.name;
	render() {
		const layout = new LayoutComponent();
		layout.highlight(this.section);

		layout.onSectionClick = section => this.navigate(`../${section.domainName}`);

		return <ui-section>
			{layout}

			<ui-hierarchy>
				{this.renderDistrict(this.section.district)}
			</ui-hierarchy>

			{new DetailSectionComponent(<ui-name>
				{this.section.name}
			</ui-name>)
				.addMetric('Real Length', () => `${(this.section.length).toFixed(1)} m`)
				.addMetric('Scale Length', () => `${(this.section.length / 87).toFixed(2)} m`)
			}
		</ui-section>
	}

	renderDistrict(district: District) {
		return [
			district.parent instanceof District && this.renderDistrict(district.parent),

			<ui-district>
				{district.name}
			</ui-district>
		]
	}

	renderEnd(end: Section | Router) {
		if (!end) {
			return <ui-buffer>
				Buffer
			</ui-buffer>;
		}

		if (end instanceof Section) {
			return <ui-section ui-href={`../${end.domainName}`}>
				{end.name}
			</ui-section>
		}

		if (end instanceof Router) {
			const renderRoute = (route: Route, end: Section) => <ui-route ui-href={`../${end.domainName}`}>
				{end.name}
			</ui-route>;

			return <ui-router>
				{end.routes.filter(route => route.in == this.section).map(route => renderRoute(route, route.out))}
				{end.routes.filter(route => route.out == this.section).map(route => renderRoute(route, route.in))}
			</ui-router>
		}
	}
}
