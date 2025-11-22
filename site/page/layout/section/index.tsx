import { Component } from "@acryps/page";
import { District, Layout, Route, Router, Section } from "@packtrack/layout";
import { LayoutPage } from "..";
import { DetailSectionComponent } from "../../shared/detail-section";
import { LayoutComponent } from "../../shared/layout";
import { hex } from "@acryps/style";
import { Application } from "../..";

export class LayoutSectionPage extends Component {
	declare parameters: { domainName };
	declare parent: LayoutPage;

	section: Section;
	layout = new LayoutComponent();

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
	render(child) {
		this.layout.highlight(this.section);
		this.layout.onSectionClick = position => this.navigate(`../${position.section.domainName}`);

		if (child) {
			return <ui-section>
				{this.layout}

				{child}
			</ui-section>
		}

		return <ui-section>
			{this.layout}

			<ui-hierarchy>
				{this.renderDistrict(this.section.district)}
			</ui-hierarchy>

			{new DetailSectionComponent(<ui-name>
				{this.section.name}
			</ui-name>)
				.addMetric('Real Length', () => `${(this.section.length).toFixed(1)} m`)
				.addMetric('Scale Length', () => `${(this.section.length / 87).toFixed(2)} m`)
			}

			{Application.session.account && <ui-actions>
				<ui-action ui-href='incident/decoupling'>
					Report Decoupling
				</ui-action>

				<ui-action ui-href='incident/derailing'>
					Report Derailing
				</ui-action>

				<ui-action ui-href='incident/power-loss'>
					Report Power Loss
				</ui-action>

				<ui-action ui-href='incident/collision'>
					Report Collision
				</ui-action>
			</ui-actions>}
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
