import { Service } from "vlserver";
import { DbContext, Graffiti, GraffitiInspiration, GraffitiInspirationMedia, RailcarDirection } from "../managed/database";
import { GraffitiCaptureViewModel, GraffitiTypeViewModel, GraffitiViewModel } from "./graffiti";
import { CaptureViewModel } from "../capture/capture";
import { Canvas, loadImage } from "skia-canvas";
import { cropGraffiti } from "../../shared/crop-graffiti";
import { ArtistViewModel } from "./artist";
import { GraffitiInspirationSummaryModel, GraffitiInspirationViewModel } from "./inspiration";

export class GraffitiService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getGraffiti(id: string) {
		return new GraffitiViewModel(
			await this.database.graffiti.find(id)
		);
	}

	async getArtist(tag: string) {
		return new ArtistViewModel(
			await this.database.artist.first(artist => artist.tag.valueOf() == tag)
		);
	}

	async getArtists() {
		return ArtistViewModel.from(
			this.database.artist.orderByAscending(artist => artist.name)
		)
	}

	async getSourceCaptures(id: string) {
		const graffiti = await this.database.graffiti.find(id);

		return CaptureViewModel.from(
			this.database.capture
				.orderByAscending(capture => capture.captured)
				.where(capture => capture.direction == graffiti.direction)
				.where(capture => capture.railcarId == graffiti.railcarId)
				.where(capture => capture.captured.isAfter(graffiti.painted))
		);
	}

	async getTypes() {
		return GraffitiTypeViewModel.from(
			this.database.graffitiType
				.orderByAscending(type => type.complexity)
		)
	}

	async getInspirations() {
		return GraffitiInspirationSummaryModel.from(
			this.database.graffitiInspiration
				.orderByDescending(graffiti => graffiti.paintingUrge)
				.orderByDescending(graffiti => graffiti.captured)
		);
	}

	async getInspiration(id: string) {
		return new GraffitiInspirationViewModel(
			await this.database.graffitiInspiration.find(id)
		);
	}

	async createInspiration(data: Buffer, mimeType: string, parentId: string) {
		let inspiration: GraffitiInspiration;

		if (parentId) {
			inspiration = await this.database.graffitiInspiration.find(parentId);
		} else {
			inspiration = new GraffitiInspiration();
			inspiration.captured = new Date();

			await inspiration.create();
		}

		const media = new GraffitiInspirationMedia();
		media.graffitiInspiration = inspiration;
		media.data = data;
		media.mimeType = mimeType;
		media.uploaded = new Date();

		await media.create();

		if (mimeType?.startsWith('image/')) {
			const image = await loadImage(data);

			const maxSize = 1000;
			const scale = Math.min(maxSize / image.width, maxSize / image.height);
			const width = image.width * scale;
			const height = image.height * scale;

			const canvas = new Canvas(width, height);
			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0, width, height);

			media.thumbnail = await canvas.toBuffer('jpeg');
			await media.update();
		}

		return inspiration.id;
	}

	async saveInpiration(inspirationViewModel: GraffitiInspirationViewModel, artistId: string) {
		const inspiration = await inspirationViewModel.toModel();
		inspiration.artistId = artistId;

		await inspiration.update();
	}

	async assignInspiration(graffitiId: string, inspirationId: string) {
		const graffiti = await this.database.graffiti.find(graffitiId);
		graffiti.graffitiInspirationId = inspirationId;

		await graffiti.update();
	}

	async register(railcarId: string, name: string, description: string, typeId: string, painted: Date, side: string, artistId: string) {
		const graffiti = new Graffiti();
		graffiti.railcarId = railcarId;
		graffiti.name = name;
		graffiti.description = description;
		graffiti.typeId = typeId;
		graffiti.painted = painted;
		graffiti.direction = side;
		graffiti.artistId = artistId;

		await graffiti.create();

		return graffiti.id;
	}

	async assign(graffitiId: string, captureModel: GraffitiCaptureViewModel) {
		const capture = await captureModel.toModel();
		capture.graffitiId = graffitiId;

		await capture.create();

		// render thumbnail
		const source = await capture.capture.fetch();
		const image = await loadImage(source.data);

		const canvas = new Canvas(1, 1);

		// crop image from full resolution
		cropGraffiti(canvas as any, image as any, capture.left, capture.top, capture.width, capture.height);
		const cropped = await loadImage(await canvas.toBuffer('png'));

		canvas.width = 2000;
		canvas.height = canvas.width / cropped.width * cropped.height;

		const context = canvas.getContext('2d');
		context.drawImage(cropped, 0, 0, canvas.width, canvas.height);

		capture.thumbnail = await canvas.toBuffer('jpeg');
		await capture.update();
	}
}
