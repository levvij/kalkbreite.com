import { Component } from "@acryps/page";
import { GraffitiInspirationSummaryModel, GraffitiInspirationViewModel, GraffitiService } from "../../managed/services";
import { Application } from "../..";

export class GraffitiInspirationsPage extends Component {
	static shortcuts = ['inspiration', 'inspo', 'i'];

	inspirations: GraffitiInspirationSummaryModel[];

	async onload() {
		this.inspirations = await new GraffitiService().getInspirations();
	}

	render(child) {
		if (child) {
			return <ui-graffiti-inspirations>
				{child}
			</ui-graffiti-inspirations>;
		}

		return <ui-graffiti-inspirations>
			{Application.session.account && <ui-actions>
				<ui-action ui-click={() => GraffitiInspirationsPage.upload(false, null).then(inspiration => this.navigate(inspiration))}>
					Upload
				</ui-action>

				<ui-action ui-click={() => GraffitiInspirationsPage.upload(true, null).then(inspiration => this.navigate(inspiration))}>
					Capture
				</ui-action>
			</ui-actions>}

			{this.renderSection('Open Inpiration', 'I did not get around to paint these great graffitis I found traveling around', this.inspirations.filter(inspiration => inspiration.paintings.length == 0))}
			{this.renderSection('Painted', 'You can find the following graffitis on the layout!', this.inspirations.filter(inspiration => inspiration.paintings.length > 0))}
		</ui-graffiti-inspirations>
	}

	renderSection(title: string, hint: string, inspirations: GraffitiInspirationSummaryModel[]) {
		return <ui-section>
			<ui-title>
				{title}
			</ui-title>

			<ui-hint>
				{hint}
			</ui-hint>

			<ui-inspirations>
				{inspirations.map(inspiration => {
					const firstImage = inspiration.media.find(media => media.mimeType?.startsWith('image/'));

					return <ui-inspiration ui-href={inspiration.id}>
						{firstImage && <ui-media>
							<img src={`/capture/graffiti/inspiration/${firstImage.id}`} loading='lazy' />
						</ui-media>}

						<ui-detail>
							<ui-name>
								{inspiration.name || '- REDACTED -'}
							</ui-name>

							<ui-origin>
								{inspiration.origin}, {inspiration.captured.toLocaleDateString()}
							</ui-origin>
						</ui-detail>
					</ui-inspiration>
				})}
			</ui-inspirations>
		</ui-section>;
	}

	static upload(capture: boolean, parent: GraffitiInspirationViewModel) {
		return new Promise<string>(done => {
			const input = document.createElement('input');
			input.type = 'file';

			if (capture) {
				input.capture = 'environment';
			}

			input.onchange = async () => {
				const file = await this.stripMetadata(input.files[0]);

				if (file) {
					const inspiration = await new GraffitiService().createInspiration(file.data, file.type, parent?.id ?? null);

					done(inspiration);
				}
			};

			input.click();
		});
	}

	static async stripMetadata(file: File): Promise<{ data: any, type: string }> {
		if (!file.type?.startsWith('image/')) {
			return {
				data: file,
				type: file.type
			};
		}

		return await new Promise(done => {
			const image = new Image();

			image.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = image.naturalWidth;
				canvas.height = image.naturalHeight;

				const context = canvas.getContext('2d');
				context.drawImage(image, 0, 0);

				canvas.toBlob(blob => {
					done({
						data: blob,
						type: 'image/jpeg'
					});
				}, 'jpeg', 0.3);
			};

			image.src = URL.createObjectURL(file);
		});
	}
}
