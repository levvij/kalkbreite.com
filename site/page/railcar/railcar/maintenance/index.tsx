import { Component } from "@acryps/page";
import { DetailSectionComponent } from "../../../shared/detail-section";
import { MaintenanceService, MaintenanceViewModel } from "../../../managed/services";

export class MaintenacePage extends Component {
	declare parameters: { id };

	maintenance: MaintenanceViewModel;

	async onload() {
		this.maintenance = await new MaintenanceService().get(this.parameters.id);
	}

	breadcrumb = () => this.maintenance.title;
	render() {
		return <ui-maintenance>
			<ui-header>
				<ui-title>
					{this.maintenance.title}
				</ui-title>

				<ui-actions>
					{!this.maintenance.completed && <ui-action ui-click={async () => {
						await new MaintenanceService().complete(this.maintenance.id);

						this.navigate('../..');
					}}>
						Mark as Complete
					</ui-action>}
				</ui-actions>
			</ui-header>

			{new DetailSectionComponent()
				.addMetric('Created', () => this.maintenance.opened.toLocaleString())
				.addMetric('Completed', () => this.maintenance.completed?.toLocaleString() ?? 'Open')
			}

			<ui-field>
				<label>
					Name
				</label>

				<input $ui-value={this.maintenance.title} ui-change={() => this.save()} />
			</ui-field>

			<ui-field>
				<label>
					Issue
				</label>

				<textarea $ui-value={this.maintenance.issue} ui-change={() => this.save()} rows={6} />
			</ui-field>

			<ui-field>
				<label>
					Description
				</label>

				<textarea $ui-value={this.maintenance.description} ui-change={() => this.save()} rows={8} />
			</ui-field>

			<ui-field>
				<label>
					Cost
				</label>

				<input $ui-value={this.maintenance.cost} ui-change={() => this.save()} type='number' />
			</ui-field>
		</ui-maintenance>
	}

	async save() {
		await new MaintenanceService().save(this.maintenance);
	}
}
