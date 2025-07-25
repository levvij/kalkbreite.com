import { BaseServer, ViewModel, Inject } from "vlserver";

import { DbContext } from "././database";
import { CompanySummaryModel } from "././../company/company";
import { CompanyViewModel } from "././../company/company";
import { CompanyService } from "././../company/index";
import { GraffitiCaptureViewModel } from "././../graffiti/graffiti";
import { GraffitiViewModel } from "././../graffiti/graffiti";
import { CaptureViewModel } from "././../capture/capture";
import { cropGraffiti } from "././../../shared/crop-graffiti";
import { ArtistViewModel } from "././../graffiti/artist";
import { GraffitiService } from "././../graffiti/index";
import { RailcarSummaryModel } from "././../railcar/railcar";
import { RailcarViewModel } from "././../railcar/railcar";
import { RailcarService } from "././../railcar/index";
import { StorageContainerViewModel } from "././../storage/storage-contaiuner";
import { StorageService } from "././../storage/index";
import { ArtistSummaryModel } from "./../graffiti/artist";
import { GraffitiSummaryModel } from "./../graffiti/graffiti";
import { GraffitiTypeViewModel } from "./../graffiti/graffiti";
import { RailcarModelSummaryModel } from "./../railcar/model";
import { StorageContainerSummaryModel } from "./../storage/storage-contaiuner";
import { RailcarModelViewModel } from "./../railcar/model";
import { Capture } from "./../managed/database";
import { Company } from "./../managed/database";
import { Artist } from "./../managed/database";
import { Graffiti } from "./../managed/database";
import { GraffitiCapture } from "./../managed/database";
import { GraffitiType } from "./../managed/database";
import { RailcarModel } from "./../managed/database";
import { Railcar } from "./../managed/database";
import { StorageContainer } from "./../managed/database";

Inject.mappings = {
	"CompanyService": {
		objectConstructor: CompanyService,
		parameters: ["DbContext"]
	},
	"DbContext": {
		objectConstructor: DbContext,
		parameters: ["RunContext"]
	},
	"GraffitiService": {
		objectConstructor: GraffitiService,
		parameters: ["DbContext"]
	},
	"RailcarService": {
		objectConstructor: RailcarService,
		parameters: ["DbContext"]
	},
	"StorageService": {
		objectConstructor: StorageService,
		parameters: ["DbContext"]
	}
};

export class ManagedServer extends BaseServer {
	prepareRoutes() {
		this.expose(
			"UwcGBkdXY5NjVteXZ3NmF1bXZlMjcxM2",
			{
			"p3ZXR5aTF5cjJtMjlxd2BvamozNDRmMm": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(CompanyService),
			(controller, params) => controller.get(
				params["p3ZXR5aTF5cjJtMjlxd2BvamozNDRmMm"]
			)
		);

		this.expose(
			"luZHczemxzMjVweHloYmg2MWIxdnhxaD",
			{
			"M2d2xyaXJydHNjcGh4bW14dXM5dGU2NH": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getGraffiti(
				params["M2d2xyaXJydHNjcGh4bW14dXM5dGU2NH"]
			)
		);

		this.expose(
			"FqYnJwcDw5NmFybzY5ajIyamFheHZodm",
			{
			"c4dDRvd2cwaGEzYWc1dHF3Z2BvensyNT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getArtist(
				params["c4dDRvd2cwaGEzYWc1dHF3Z2BvensyNT"]
			)
		);

		this.expose(
			"lnejh3dXVsb2BiYTp4bDI2aHRqYWdpdX",
			{
			"1kemNjbGd5YXdxMHkyc2t6eHo3emNyeW": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getSourceCaptures(
				params["1kemNjbGd5YXdxMHkyc2t6eHo3emNyeW"]
			)
		);

		this.expose(
			"JsMnZhdDB2aDQxNnZqNmZoeTBoejd2MT",
			{
			"hiZHpkejpldXlraD1xOGZ1dnB2MWV4eG": { type: "string", isArray: false, isOptional: false },
				"9ianV0d2QxZ2QzM2p4NmMyaGE2ZGZzdm": { type: GraffitiCaptureViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.assign(
				params["hiZHpkejpldXlraD1xOGZ1dnB2MWV4eG"],
				params["9ianV0d2QxZ2QzM2p4NmMyaGE2ZGZzdm"]
			)
		);

		this.expose(
			"F5MWVheDdpemBtMHpic2k0NTdiZWhkYz",
			{},
			inject => inject.construct(RailcarService),
			(controller, params) => controller.list(
				
			)
		);

		this.expose(
			"B1ZzhiazNlMDNrYXVzNGZwanA1dGlod2",
			{
			"J6ZnUwOHpxNDN2eHlpdjlvcjBtZXRtaH": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(RailcarService),
			(controller, params) => controller.get(
				params["J6ZnUwOHpxNDN2eHlpdjlvcjBtZXRtaH"]
			)
		);

		this.expose(
			"g2eDZmZWdoZjN3YWV5M2k0a2FocWFod2",
			{
			"FpNz1jaHk2emZvY2Z4dDdvOGZ2Zml4eD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(StorageService),
			(controller, params) => controller.getContainer(
				params["FpNz1jaHk2emZvY2Z4dDdvOGZ2Zml4eD"]
			)
		)
	}
}

ViewModel.mappings = {
	[CaptureViewModel.name]: class ComposedCaptureViewModel extends CaptureViewModel {
		async map() {
			return {
				captured: this.$$model.captured,
				direction: this.$$model.direction,
				id: this.$$model.id
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				captured: true,
				direction: true,
				id: true
			};
		};

		static toViewModel(data) {
			const item = new CaptureViewModel(null);
			"captured" in data && (item.captured = data.captured === null ? null : new Date(data.captured));
			"direction" in data && (item.direction = data.direction === null ? null : data.direction);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: CaptureViewModel) {
			let model: Capture;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Capture).find(viewModel.id)
			} else {
				model = new Capture();
			}
			
			"captured" in viewModel && (model.captured = viewModel.captured === null ? null : new Date(viewModel.captured));
			"direction" in viewModel && (model.direction = viewModel.direction === null ? null : viewModel.direction);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[CompanySummaryModel.name]: class ComposedCompanySummaryModel extends CompanySummaryModel {
		async map() {
			return {
				iconId: this.$$model.iconId,
				id: this.$$model.id,
				name: this.$$model.name,
				shortname: this.$$model.shortname,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				iconId: true,
				id: true,
				name: true,
				shortname: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new CompanySummaryModel(null);
			"iconId" in data && (item.iconId = data.iconId === null ? null : `${data.iconId}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: CompanySummaryModel) {
			let model: Company;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Company).find(viewModel.id)
			} else {
				model = new Company();
			}
			
			"iconId" in viewModel && (model.iconId = viewModel.iconId === null ? null : `${viewModel.iconId}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortname" in viewModel && (model.shortname = viewModel.shortname === null ? null : `${viewModel.shortname}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[ArtistSummaryModel.name]: class ComposedArtistSummaryModel extends ArtistSummaryModel {
		async map() {
			return {
				id: this.$$model.id,
				logo: this.$$model.logo,
				name: this.$$model.name,
				summary: this.$$model.summary,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				logo: true,
				name: true,
				summary: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new ArtistSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"logo" in data && (item.logo = data.logo === null ? null : `${data.logo}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"summary" in data && (item.summary = data.summary === null ? null : `${data.summary}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: ArtistSummaryModel) {
			let model: Artist;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Artist).find(viewModel.id)
			} else {
				model = new Artist();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"logo" in viewModel && (model.logo = viewModel.logo === null ? null : `${viewModel.logo}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"summary" in viewModel && (model.summary = viewModel.summary === null ? null : `${viewModel.summary}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[GraffitiSummaryModel.name]: class ComposedGraffitiSummaryModel extends GraffitiSummaryModel {
		async map() {
			return {
				artist: new ArtistSummaryModel(await BaseServer.unwrap(this.$$model.artist)),
				captures: (await this.$$model.captures.includeTree(ViewModel.mappings[GraffitiCaptureViewModel.name].items).toArray()).map(item => new GraffitiCaptureViewModel(item)),
				type: new GraffitiTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
				id: this.$$model.id,
				name: this.$$model.name,
				painted: this.$$model.painted
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get artist() {
					return ViewModel.mappings[ArtistSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "artist-GraffitiSummaryModel"]
					);
				},
				get captures() {
					return ViewModel.mappings[GraffitiCaptureViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "captures-GraffitiSummaryModel"]
					);
				},
				get type() {
					return ViewModel.mappings[GraffitiTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-GraffitiSummaryModel"]
					);
				},
				id: true,
				name: true,
				painted: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiSummaryModel(null);
			"artist" in data && (item.artist = data.artist && ViewModel.mappings[ArtistSummaryModel.name].toViewModel(data.artist));
			"captures" in data && (item.captures = data.captures && [...data.captures].map(i => ViewModel.mappings[GraffitiCaptureViewModel.name].toViewModel(i)));
			"type" in data && (item.type = data.type && ViewModel.mappings[GraffitiTypeViewModel.name].toViewModel(data.type));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"painted" in data && (item.painted = data.painted === null ? null : new Date(data.painted));

			return item;
		}

		static async toModel(viewModel: GraffitiSummaryModel) {
			let model: Graffiti;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Graffiti).find(viewModel.id)
			} else {
				model = new Graffiti();
			}
			
			"artist" in viewModel && (model.artist.id = viewModel.artist ? viewModel.artist.id : null);
			"captures" in viewModel && (null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"painted" in viewModel && (model.painted = viewModel.painted === null ? null : new Date(viewModel.painted));

			return model;
		}
	},
	[GraffitiCaptureViewModel.name]: class ComposedGraffitiCaptureViewModel extends GraffitiCaptureViewModel {
		async map() {
			return {
				height: this.$$model.height,
				id: this.$$model.id,
				left: this.$$model.left,
				sourceId: this.$$model.sourceId,
				top: this.$$model.top,
				width: this.$$model.width
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				height: true,
				id: true,
				left: true,
				sourceId: true,
				top: true,
				width: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiCaptureViewModel(null);
			"height" in data && (item.height = data.height === null ? null : +data.height);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"left" in data && (item.left = data.left === null ? null : +data.left);
			"sourceId" in data && (item.sourceId = data.sourceId === null ? null : `${data.sourceId}`);
			"top" in data && (item.top = data.top === null ? null : +data.top);
			"width" in data && (item.width = data.width === null ? null : +data.width);

			return item;
		}

		static async toModel(viewModel: GraffitiCaptureViewModel) {
			let model: GraffitiCapture;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(GraffitiCapture).find(viewModel.id)
			} else {
				model = new GraffitiCapture();
			}
			
			"height" in viewModel && (model.height = viewModel.height === null ? null : +viewModel.height);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"left" in viewModel && (model.left = viewModel.left === null ? null : +viewModel.left);
			"sourceId" in viewModel && (model.sourceId = viewModel.sourceId === null ? null : `${viewModel.sourceId}`);
			"top" in viewModel && (model.top = viewModel.top === null ? null : +viewModel.top);
			"width" in viewModel && (model.width = viewModel.width === null ? null : +viewModel.width);

			return model;
		}
	},
	[GraffitiTypeViewModel.name]: class ComposedGraffitiTypeViewModel extends GraffitiTypeViewModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiTypeViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: GraffitiTypeViewModel) {
			let model: GraffitiType;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(GraffitiType).find(viewModel.id)
			} else {
				model = new GraffitiType();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[RailcarModelSummaryModel.name]: class ComposedRailcarModelSummaryModel extends RailcarModelSummaryModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name,
				shortname: this.$$model.shortname,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				name: true,
				shortname: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarModelSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: RailcarModelSummaryModel) {
			let model: RailcarModel;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(RailcarModel).find(viewModel.id)
			} else {
				model = new RailcarModel();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortname" in viewModel && (model.shortname = viewModel.shortname === null ? null : `${viewModel.shortname}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[RailcarSummaryModel.name]: class ComposedRailcarSummaryModel extends RailcarSummaryModel {
		async map() {
			return {
				model: new RailcarModelSummaryModel(await BaseServer.unwrap(this.$$model.model)),
				givenName: this.$$model.givenName,
				id: this.$$model.id,
				runningNumber: this.$$model.runningNumber,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get model() {
					return ViewModel.mappings[RailcarModelSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "model-RailcarSummaryModel"]
					);
				},
				givenName: true,
				id: true,
				runningNumber: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarSummaryModel(null);
			"model" in data && (item.model = data.model && ViewModel.mappings[RailcarModelSummaryModel.name].toViewModel(data.model));
			"givenName" in data && (item.givenName = data.givenName === null ? null : `${data.givenName}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"runningNumber" in data && (item.runningNumber = data.runningNumber === null ? null : `${data.runningNumber}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: RailcarSummaryModel) {
			let model: Railcar;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Railcar).find(viewModel.id)
			} else {
				model = new Railcar();
			}
			
			"model" in viewModel && (model.model.id = viewModel.model ? viewModel.model.id : null);
			"givenName" in viewModel && (model.givenName = viewModel.givenName === null ? null : `${viewModel.givenName}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"runningNumber" in viewModel && (model.runningNumber = viewModel.runningNumber === null ? null : `${viewModel.runningNumber}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[StorageContainerSummaryModel.name]: class ComposedStorageContainerSummaryModel extends StorageContainerSummaryModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new StorageContainerSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: StorageContainerSummaryModel) {
			let model: StorageContainer;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(StorageContainer).find(viewModel.id)
			} else {
				model = new StorageContainer();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[CompanyViewModel.name]: class ComposedCompanyViewModel extends CompanyViewModel {
		async map() {
			return {
				manufacturedRailcars: (await this.$$model.manufacturedRailcars.includeTree(ViewModel.mappings[RailcarSummaryModel.name].items).toArray()).map(item => new RailcarSummaryModel(item)),
				operatedRailcars: (await this.$$model.operatedRailcars.includeTree(ViewModel.mappings[RailcarSummaryModel.name].items).toArray()).map(item => new RailcarSummaryModel(item)),
				ownedRailcars: (await this.$$model.ownedRailcars.includeTree(ViewModel.mappings[RailcarSummaryModel.name].items).toArray()).map(item => new RailcarSummaryModel(item)),
				parent: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.parent)),
				description: this.$$model.description,
				iconId: this.$$model.iconId,
				id: this.$$model.id,
				name: this.$$model.name,
				shortname: this.$$model.shortname,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get manufacturedRailcars() {
					return ViewModel.mappings[RailcarSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "manufacturedRailcars-CompanyViewModel"]
					);
				},
				get operatedRailcars() {
					return ViewModel.mappings[RailcarSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "operatedRailcars-CompanyViewModel"]
					);
				},
				get ownedRailcars() {
					return ViewModel.mappings[RailcarSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "ownedRailcars-CompanyViewModel"]
					);
				},
				get parent() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "parent-CompanyViewModel"]
					);
				},
				description: true,
				iconId: true,
				id: true,
				name: true,
				shortname: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new CompanyViewModel(null);
			"manufacturedRailcars" in data && (item.manufacturedRailcars = data.manufacturedRailcars && [...data.manufacturedRailcars].map(i => ViewModel.mappings[RailcarSummaryModel.name].toViewModel(i)));
			"operatedRailcars" in data && (item.operatedRailcars = data.operatedRailcars && [...data.operatedRailcars].map(i => ViewModel.mappings[RailcarSummaryModel.name].toViewModel(i)));
			"ownedRailcars" in data && (item.ownedRailcars = data.ownedRailcars && [...data.ownedRailcars].map(i => ViewModel.mappings[RailcarSummaryModel.name].toViewModel(i)));
			"parent" in data && (item.parent = data.parent && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.parent));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"iconId" in data && (item.iconId = data.iconId === null ? null : `${data.iconId}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: CompanyViewModel) {
			let model: Company;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Company).find(viewModel.id)
			} else {
				model = new Company();
			}
			
			"manufacturedRailcars" in viewModel && (null);
			"operatedRailcars" in viewModel && (null);
			"ownedRailcars" in viewModel && (null);
			"parent" in viewModel && (model.parent.id = viewModel.parent ? viewModel.parent.id : null);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"iconId" in viewModel && (model.iconId = viewModel.iconId === null ? null : `${viewModel.iconId}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortname" in viewModel && (model.shortname = viewModel.shortname === null ? null : `${viewModel.shortname}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[ArtistViewModel.name]: class ComposedArtistViewModel extends ArtistViewModel {
		async map() {
			return {
				graffitis: (await this.$$model.graffitis.includeTree(ViewModel.mappings[GraffitiSummaryModel.name].items).toArray()).map(item => new GraffitiSummaryModel(item)),
				description: this.$$model.description,
				id: this.$$model.id,
				logo: this.$$model.logo,
				name: this.$$model.name,
				origin: this.$$model.origin,
				summary: this.$$model.summary,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get graffitis() {
					return ViewModel.mappings[GraffitiSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "graffitis-ArtistViewModel"]
					);
				},
				description: true,
				id: true,
				logo: true,
				name: true,
				origin: true,
				summary: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new ArtistViewModel(null);
			"graffitis" in data && (item.graffitis = data.graffitis && [...data.graffitis].map(i => ViewModel.mappings[GraffitiSummaryModel.name].toViewModel(i)));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"logo" in data && (item.logo = data.logo === null ? null : `${data.logo}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"origin" in data && (item.origin = data.origin === null ? null : `${data.origin}`);
			"summary" in data && (item.summary = data.summary === null ? null : `${data.summary}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: ArtistViewModel) {
			let model: Artist;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Artist).find(viewModel.id)
			} else {
				model = new Artist();
			}
			
			"graffitis" in viewModel && (null);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"logo" in viewModel && (model.logo = viewModel.logo === null ? null : `${viewModel.logo}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"origin" in viewModel && (model.origin = viewModel.origin === null ? null : `${viewModel.origin}`);
			"summary" in viewModel && (model.summary = viewModel.summary === null ? null : `${viewModel.summary}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[GraffitiViewModel.name]: class ComposedGraffitiViewModel extends GraffitiViewModel {
		async map() {
			return {
				artist: new ArtistSummaryModel(await BaseServer.unwrap(this.$$model.artist)),
				captures: (await this.$$model.captures.includeTree(ViewModel.mappings[GraffitiCaptureViewModel.name].items).toArray()).map(item => new GraffitiCaptureViewModel(item)),
				railcar: new RailcarSummaryModel(await BaseServer.unwrap(this.$$model.railcar)),
				type: new GraffitiTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
				description: this.$$model.description,
				direction: this.$$model.direction,
				id: this.$$model.id,
				name: this.$$model.name,
				painted: this.$$model.painted
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get artist() {
					return ViewModel.mappings[ArtistSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "artist-GraffitiViewModel"]
					);
				},
				get captures() {
					return ViewModel.mappings[GraffitiCaptureViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "captures-GraffitiViewModel"]
					);
				},
				get railcar() {
					return ViewModel.mappings[RailcarSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "railcar-GraffitiViewModel"]
					);
				},
				get type() {
					return ViewModel.mappings[GraffitiTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-GraffitiViewModel"]
					);
				},
				description: true,
				direction: true,
				id: true,
				name: true,
				painted: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiViewModel(null);
			"artist" in data && (item.artist = data.artist && ViewModel.mappings[ArtistSummaryModel.name].toViewModel(data.artist));
			"captures" in data && (item.captures = data.captures && [...data.captures].map(i => ViewModel.mappings[GraffitiCaptureViewModel.name].toViewModel(i)));
			"railcar" in data && (item.railcar = data.railcar && ViewModel.mappings[RailcarSummaryModel.name].toViewModel(data.railcar));
			"type" in data && (item.type = data.type && ViewModel.mappings[GraffitiTypeViewModel.name].toViewModel(data.type));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"direction" in data && (item.direction = data.direction === null ? null : data.direction);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"painted" in data && (item.painted = data.painted === null ? null : new Date(data.painted));

			return item;
		}

		static async toModel(viewModel: GraffitiViewModel) {
			let model: Graffiti;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Graffiti).find(viewModel.id)
			} else {
				model = new Graffiti();
			}
			
			"artist" in viewModel && (model.artist.id = viewModel.artist ? viewModel.artist.id : null);
			"captures" in viewModel && (null);
			"railcar" in viewModel && (model.railcar.id = viewModel.railcar ? viewModel.railcar.id : null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"direction" in viewModel && (model.direction = viewModel.direction === null ? null : viewModel.direction);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"painted" in viewModel && (model.painted = viewModel.painted === null ? null : new Date(viewModel.painted));

			return model;
		}
	},
	[RailcarModelViewModel.name]: class ComposedRailcarModelViewModel extends RailcarModelViewModel {
		async map() {
			return {
				id: this.$$model.id,
				lengthIncludingBuffers: this.$$model.lengthIncludingBuffers,
				lengthIncludingCouplers: this.$$model.lengthIncludingCouplers,
				name: this.$$model.name,
				shortname: this.$$model.shortname,
				summary: this.$$model.summary,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				lengthIncludingBuffers: true,
				lengthIncludingCouplers: true,
				name: true,
				shortname: true,
				summary: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarModelViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"lengthIncludingBuffers" in data && (item.lengthIncludingBuffers = data.lengthIncludingBuffers === null ? null : +data.lengthIncludingBuffers);
			"lengthIncludingCouplers" in data && (item.lengthIncludingCouplers = data.lengthIncludingCouplers === null ? null : +data.lengthIncludingCouplers);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);
			"summary" in data && (item.summary = data.summary === null ? null : `${data.summary}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: RailcarModelViewModel) {
			let model: RailcarModel;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(RailcarModel).find(viewModel.id)
			} else {
				model = new RailcarModel();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"lengthIncludingBuffers" in viewModel && (model.lengthIncludingBuffers = viewModel.lengthIncludingBuffers === null ? null : +viewModel.lengthIncludingBuffers);
			"lengthIncludingCouplers" in viewModel && (model.lengthIncludingCouplers = viewModel.lengthIncludingCouplers === null ? null : +viewModel.lengthIncludingCouplers);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortname" in viewModel && (model.shortname = viewModel.shortname === null ? null : `${viewModel.shortname}`);
			"summary" in viewModel && (model.summary = viewModel.summary === null ? null : `${viewModel.summary}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[RailcarViewModel.name]: class ComposedRailcarViewModel extends RailcarViewModel {
		async map() {
			return {
				manufacturer: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.manufacturer)),
				model: new RailcarModelViewModel(await BaseServer.unwrap(this.$$model.model)),
				operator: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.operator)),
				owner: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.owner)),
				captures: (await this.$$model.captures.includeTree(ViewModel.mappings[CaptureViewModel.name].items).toArray()).map(item => new CaptureViewModel(item)),
				graffitis: (await this.$$model.graffitis.includeTree(ViewModel.mappings[GraffitiSummaryModel.name].items).toArray()).map(item => new GraffitiSummaryModel(item)),
				storageContainer: new StorageContainerSummaryModel(await BaseServer.unwrap(this.$$model.storageContainer)),
				aquired: this.$$model.aquired,
				givenName: this.$$model.givenName,
				id: this.$$model.id,
				note: this.$$model.note,
				runningNumber: this.$$model.runningNumber,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get manufacturer() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "manufacturer-RailcarViewModel"]
					);
				},
				get model() {
					return ViewModel.mappings[RailcarModelViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "model-RailcarViewModel"]
					);
				},
				get operator() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "operator-RailcarViewModel"]
					);
				},
				get owner() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "owner-RailcarViewModel"]
					);
				},
				get captures() {
					return ViewModel.mappings[CaptureViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "captures-RailcarViewModel"]
					);
				},
				get graffitis() {
					return ViewModel.mappings[GraffitiSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "graffitis-RailcarViewModel"]
					);
				},
				get storageContainer() {
					return ViewModel.mappings[StorageContainerSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "storageContainer-RailcarViewModel"]
					);
				},
				aquired: true,
				givenName: true,
				id: true,
				note: true,
				runningNumber: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarViewModel(null);
			"manufacturer" in data && (item.manufacturer = data.manufacturer && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.manufacturer));
			"model" in data && (item.model = data.model && ViewModel.mappings[RailcarModelViewModel.name].toViewModel(data.model));
			"operator" in data && (item.operator = data.operator && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.operator));
			"owner" in data && (item.owner = data.owner && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.owner));
			"captures" in data && (item.captures = data.captures && [...data.captures].map(i => ViewModel.mappings[CaptureViewModel.name].toViewModel(i)));
			"graffitis" in data && (item.graffitis = data.graffitis && [...data.graffitis].map(i => ViewModel.mappings[GraffitiSummaryModel.name].toViewModel(i)));
			"storageContainer" in data && (item.storageContainer = data.storageContainer && ViewModel.mappings[StorageContainerSummaryModel.name].toViewModel(data.storageContainer));
			"aquired" in data && (item.aquired = data.aquired === null ? null : new Date(data.aquired));
			"givenName" in data && (item.givenName = data.givenName === null ? null : `${data.givenName}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"note" in data && (item.note = data.note === null ? null : `${data.note}`);
			"runningNumber" in data && (item.runningNumber = data.runningNumber === null ? null : `${data.runningNumber}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: RailcarViewModel) {
			let model: Railcar;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Railcar).find(viewModel.id)
			} else {
				model = new Railcar();
			}
			
			"manufacturer" in viewModel && (model.manufacturer.id = viewModel.manufacturer ? viewModel.manufacturer.id : null);
			"model" in viewModel && (model.model.id = viewModel.model ? viewModel.model.id : null);
			"operator" in viewModel && (model.operator.id = viewModel.operator ? viewModel.operator.id : null);
			"owner" in viewModel && (model.owner.id = viewModel.owner ? viewModel.owner.id : null);
			"captures" in viewModel && (null);
			"graffitis" in viewModel && (null);
			"storageContainer" in viewModel && (model.storageContainer.id = viewModel.storageContainer ? viewModel.storageContainer.id : null);
			"aquired" in viewModel && (model.aquired = viewModel.aquired === null ? null : new Date(viewModel.aquired));
			"givenName" in viewModel && (model.givenName = viewModel.givenName === null ? null : `${viewModel.givenName}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"note" in viewModel && (model.note = viewModel.note === null ? null : `${viewModel.note}`);
			"runningNumber" in viewModel && (model.runningNumber = viewModel.runningNumber === null ? null : `${viewModel.runningNumber}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[StorageContainerViewModel.name]: class ComposedStorageContainerViewModel extends StorageContainerViewModel {
		async map() {
			return {
				railcars: (await this.$$model.railcars.includeTree(ViewModel.mappings[RailcarSummaryModel.name].items).toArray()).map(item => new RailcarSummaryModel(item)),
				id: this.$$model.id,
				name: this.$$model.name,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get railcars() {
					return ViewModel.mappings[RailcarSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "railcars-StorageContainerViewModel"]
					);
				},
				id: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new StorageContainerViewModel(null);
			"railcars" in data && (item.railcars = data.railcars && [...data.railcars].map(i => ViewModel.mappings[RailcarSummaryModel.name].toViewModel(i)));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: StorageContainerViewModel) {
			let model: StorageContainer;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(StorageContainer).find(viewModel.id)
			} else {
				model = new StorageContainer();
			}
			
			"railcars" in viewModel && (null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	}
};