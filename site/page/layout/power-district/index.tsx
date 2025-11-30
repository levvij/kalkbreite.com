import { Component } from "@acryps/page";
import { PowerDistrict, Section, SectionPosition } from "@packtrack/layout";
import { LayoutPage } from "..";
import { LayoutComponent } from "../../shared/layout";
import { primaryColor } from "../../index.style";
import { DetailSectionComponent } from "../../shared/detail-section";

export class PowerDistrictPage extends Component {
	declare parameters: { domainName };
	declare parent: LayoutPage;

	powerDistrict: PowerDistrict;
	layout = new LayoutComponent();

	sections: Section[] = [];

	async onload() {
		for (let district of this.parent.layout.allDistricts) {
			for (let powerDistrict of district.powerDistricts) {
				if (powerDistrict.domainName == this.parameters.domainName) {
					this.powerDistrict = powerDistrict;
				}
			}
		}

		for (let district of this.parent.layout.allDistricts) {
			for (let section of district.sections) {
				if (section.powerDistrict == this.powerDistrict) {
					this.layout.mark(
						primaryColor,
						new SectionPosition(section, 0, false),
						new SectionPosition(section, section.length, false)
					);

					this.sections.push(section);
				}
			}
		}

		this.layout.onSectionClick = (position: SectionPosition) => {
			if (position.section.powerDistrict) {
				this.navigate(`../${position.section.powerDistrict.domainName}`);
			}
		}
	}

	breadcrumb = () => `Power District ${this.powerDistrict.name}`;
	render() {
		return <ui-power-district>
			{this.layout}

			{new DetailSectionComponent(<ui-district>
				<ui-name>
					{this.powerDistrict.name}
				</ui-name>

				<ui-sections>
					{this.sections.map(section => <ui-section ui-href={`../../section/${section.domainName}`}>
						{section.name}
					</ui-section>)}
				</ui-sections>
			</ui-district>)
				.addMetric('Section Count', () => this.sections.length)
				.addMetric('Activator', () => this.powerDistrict.activator.device.identifier)
				.addMetric('Reverser', () => this.powerDistrict.reverser.device.identifier)
				.addMetric('Monitor', () => this.powerDistrict.monitor.device.identifier)
			}
		</ui-power-district>
	}
}
