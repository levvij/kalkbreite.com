import { Component } from "@acryps/page";
import { CaptureViewModel, GraffitiService, GraffitiViewModel, RailcarDirection } from "../managed/services";
import { DetailSectionComponent } from "../shared/detail-section";
import { SlideshowComponent } from "../shared/slideshow";
import { GraffitiCrossComponent } from "./cross";
import { Application } from "..";
import { InspirationComponent } from "./inspiration";

export class GraffitiPage extends Component {
	declare parameters: { id };
	static shortcuts = ['graffiti', 'graff', 'g'];

	graffiti: GraffitiViewModel;
	sourceCaptures: CaptureViewModel[];

	async onload() {
		this.graffiti = await new GraffitiService().getGraffiti(this.parameters.id);
		this.sourceCaptures = await new GraffitiService().getSourceCaptures(this.graffiti.id);
	}

	render(child) {
		if (child) {
			return <ui-graffiti>
				{child}
			</ui-graffiti>
		}

		return <ui-graffiti>
			{this.graffiti.captures.length != 0 && new SlideshowComponent(index => `/capture/graffiti/capture/${this.graffiti.captures[index % this.graffiti.captures.length].id}`)}

			<ui-detail>
				{Application.session.account && <ui-actions>
					<ui-action ui-href='assign-inspiration'>
						Assign Inspiration
					</ui-action>
				</ui-actions>}

				{this.graffiti.name && <ui-name>
					{this.graffiti.name}
				</ui-name>}

				{this.graffiti.description && <ui-description>
					{this.graffiti.description}
				</ui-description>}

				{new DetailSectionComponent(this.graffiti.artist && <ui-artist ui-href={`/artist/${this.graffiti.artist.tag}`}>
					{this.graffiti.artist.logo ? <img src={URL.createObjectURL(new Blob([this.graffiti.artist.logo], { type: 'image/svg+xml' }))} /> : <ui-name>
						{this.graffiti.artist.name}
					</ui-name>}

					<ui-summary>
						{this.graffiti.artist.summary ?? '- REDACTED -'}
					</ui-summary>
				</ui-artist>)
					.addMetric('Painted', () => this.graffiti.painted.toLocaleDateString())
					.addMetric('Class', () => this.graffiti.type.name)
					.addMetric('Railcar', () => this.graffiti.railcar.givenName ?? this.graffiti.railcar.model?.shortname, `/railcar/${this.graffiti.railcar.tag}`)
					.addMetric('Railcar Side', () => this.graffiti.direction == RailcarDirection.forward ? 'Left' : 'Right')
					.addMetric('Captures', () => this.graffiti.captures.length.toString())
				}

				{new GraffitiCrossComponent(this.graffiti)}
				{new InspirationComponent(this.graffiti)}

				<ui-captures>
					{this.sourceCaptures.map(capture => {
						const assigned = this.graffiti.captures.find(assigned => assigned.sourceId == capture.id);

						if (assigned) {
							return <ui-capture>
								<img src={`/capture/graffiti/capture/${assigned.id}`} />

								<ui-detail>
									<ui-captured>
										{capture.captured?.toLocaleDateString()}
									</ui-captured>
								</ui-detail>
							</ui-capture>
						}

						return <ui-capture>
							<img src={`/capture/${capture.id}`} />

							<ui-detail>
								<ui-captured>
									{capture.captured?.toLocaleDateString()}
								</ui-captured>

								<ui-actions>
									<ui-action ui-href={`assign/${capture.id}`}>
										Assign Manually
									</ui-action>
								</ui-actions>
							</ui-detail>
						</ui-capture>
					})}
				</ui-captures>
			</ui-detail>
		</ui-graffiti>
	}
}
