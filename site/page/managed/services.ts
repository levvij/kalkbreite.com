export class CompanySummaryModel {
	id: string;
	name: string;

	private static $build(raw) {
		const item = new CompanySummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class RailcarModelSummaryModel {
	id: string;
	name: string;
	shortname: string;

	private static $build(raw) {
		const item = new RailcarModelSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortname === undefined || (item.shortname = raw.shortname === null ? null : `${raw.shortname}`)
		
		return item;
	}
}

export class RailcarSummaryModel {
	model: RailcarModelSummaryModel;
	givenName: string;
	id: string;
	runningNumber: string;
	tag: string;

	private static $build(raw) {
		const item = new RailcarSummaryModel();
		raw.model === undefined || (item.model = raw.model ? RailcarModelSummaryModel["$build"](raw.model) : null)
		raw.givenName === undefined || (item.givenName = raw.givenName === null ? null : `${raw.givenName}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.runningNumber === undefined || (item.runningNumber = raw.runningNumber === null ? null : `${raw.runningNumber}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class StorageContainerSummaryModel {
	id: string;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new StorageContainerSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class RailcarModelViewModel {
	id: string;
	lengthIncludingBuffers: number;
	lengthIncludingCouplers: number;
	name: string;
	shortname: string;

	private static $build(raw) {
		const item = new RailcarModelViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.lengthIncludingBuffers === undefined || (item.lengthIncludingBuffers = raw.lengthIncludingBuffers === null ? null : +raw.lengthIncludingBuffers)
		raw.lengthIncludingCouplers === undefined || (item.lengthIncludingCouplers = raw.lengthIncludingCouplers === null ? null : +raw.lengthIncludingCouplers)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortname === undefined || (item.shortname = raw.shortname === null ? null : `${raw.shortname}`)
		
		return item;
	}
}

export class RailcarViewModel {
	manufacturer: CompanySummaryModel;
	model: RailcarModelViewModel;
	operator: CompanySummaryModel;
	owner: CompanySummaryModel;
	storageContainer: StorageContainerSummaryModel;
	aquired: Date;
	givenName: string;
	id: string;
	note: string;
	runningNumber: string;
	tag: string;

	private static $build(raw) {
		const item = new RailcarViewModel();
		raw.manufacturer === undefined || (item.manufacturer = raw.manufacturer ? CompanySummaryModel["$build"](raw.manufacturer) : null)
		raw.model === undefined || (item.model = raw.model ? RailcarModelViewModel["$build"](raw.model) : null)
		raw.operator === undefined || (item.operator = raw.operator ? CompanySummaryModel["$build"](raw.operator) : null)
		raw.owner === undefined || (item.owner = raw.owner ? CompanySummaryModel["$build"](raw.owner) : null)
		raw.storageContainer === undefined || (item.storageContainer = raw.storageContainer ? StorageContainerSummaryModel["$build"](raw.storageContainer) : null)
		raw.aquired === undefined || (item.aquired = raw.aquired ? new Date(raw.aquired) : null)
		raw.givenName === undefined || (item.givenName = raw.givenName === null ? null : `${raw.givenName}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.note === undefined || (item.note = raw.note === null ? null : `${raw.note}`)
		raw.runningNumber === undefined || (item.runningNumber = raw.runningNumber === null ? null : `${raw.runningNumber}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class StorageContainerViewModel {
	railcars: RailcarSummaryModel[];
	id: string;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new StorageContainerViewModel();
		raw.railcars === undefined || (item.railcars = raw.railcars ? raw.railcars.map(i => RailcarSummaryModel["$build"](i)) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class Service {
	static baseUrl = "";

	static toURL(request) {
		return `${this.baseUrl}${request}`;
	}
	
	static stringify(object) {
		if (Array.isArray(object)) {
			return '[' + object.map(item => this.stringify(item)).join(',') + ']';
		}
	
		return JSON.stringify(object, (key, value) => {
			if (value instanceof Date) {
				return value.toISOString();
			}
			
			if (value === null) {
				return null;
			}
			
			if (typeof value === 'object' && key !== '') {
				if (value && 'id' in value) {
					return {
						id: value.id
					};
				}
			
				return undefined;
			}
			
			return value;
		});
	}
}

export class CompanyService {
	async get(id: string): Promise<CompanySummaryModel> {
		const $data = new FormData();
		$data.append("k4cXRkMG9nYndhaGU1ajV3Yzh5dWd4Nm", Service.stringify(id))

		return await fetch(Service.toURL("NjNGlzN2NsdGhuc3ZicmVsNmF4YXA5d2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : CompanySummaryModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class RailcarService {
	async list(): Promise<Array<RailcarSummaryModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("F5MWVheDdpemBtMHpic2k0NTdiZWhkYz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : RailcarSummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async get(tag: string): Promise<RailcarViewModel> {
		const $data = new FormData();
		$data.append("J6ZnUwOHpxNDN2eHlpdjlvcjBtZXRtaH", Service.stringify(tag))

		return await fetch(Service.toURL("B1ZzhiazNlMDNrYXVzNGZwanA1dGlod2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : RailcarViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class StorageService {
	async getContainer(tag: string): Promise<StorageContainerViewModel> {
		const $data = new FormData();
		$data.append("FpNz1jaHk2emZvY2Z4dDdvOGZ2Zml4eD", Service.stringify(tag))

		return await fetch(Service.toURL("g2eDZmZWdoZjN3YWV5M2k0a2FocWFod2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : StorageContainerViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}