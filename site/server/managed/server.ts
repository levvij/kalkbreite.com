import { BaseServer, ViewModel, Inject } from "vlserver";

import { DbContext } from "././database";
import { CompanySummaryModel } from "././../company/company";
import { CompanyService } from "././../company/index";
import { RailcarSummaryModel } from "././../railcar/railcar";
import { RailcarViewModel } from "././../railcar/railcar";
import { RailcarService } from "././../railcar/index";
import { StorageContainerViewModel } from "././../storage/storage-contaiuner";
import { StorageService } from "././../storage/index";
import { RailcarModelSummaryModel } from "./../railcar/model";
import { StorageContainerSummaryModel } from "./../storage/storage-contaiuner";
import { RailcarModelViewModel } from "./../railcar/model";
import { Company } from "./../managed/database";
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
			"NjNGlzN2NsdGhuc3ZicmVsNmF4YXA5d2",
			{
			"k4cXRkMG9nYndhaGU1ajV3Yzh5dWd4Nm": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(CompanyService),
			(controller, params) => controller.get(
				params["k4cXRkMG9nYndhaGU1ajV3Yzh5dWd4Nm"]
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
	[CompanySummaryModel.name]: class ComposedCompanySummaryModel extends CompanySummaryModel {
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
			const item = new CompanySummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: CompanySummaryModel) {
			let model: Company;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Company).find(viewModel.id)
			} else {
				model = new Company();
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
				shortname: this.$$model.shortname
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
				shortname: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarModelSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);

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
	[RailcarModelViewModel.name]: class ComposedRailcarModelViewModel extends RailcarModelViewModel {
		async map() {
			return {
				id: this.$$model.id,
				lengthIncludingBuffers: this.$$model.lengthIncludingBuffers,
				lengthIncludingCouplers: this.$$model.lengthIncludingCouplers,
				name: this.$$model.name,
				shortname: this.$$model.shortname
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
				shortname: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarModelViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"lengthIncludingBuffers" in data && (item.lengthIncludingBuffers = data.lengthIncludingBuffers === null ? null : +data.lengthIncludingBuffers);
			"lengthIncludingCouplers" in data && (item.lengthIncludingCouplers = data.lengthIncludingCouplers === null ? null : +data.lengthIncludingCouplers);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);

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