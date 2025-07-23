export enum RailcarDirection {
	forward = "forward",
	reverse = "reverse"
}

export class CaptureViewModel {
	captured: Date;
	direction: RailcarDirection;
	id: string;

	private static $build(raw) {
		const item = new CaptureViewModel();
		raw.captured === undefined || (item.captured = raw.captured ? new Date(raw.captured) : null)
		raw.direction === undefined || (item.direction = raw.direction)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class CompanySummaryModel {
	id: string;
	name: string;
	shortname: string;
	tag: string;

	private static $build(raw) {
		const item = new CompanySummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortname === undefined || (item.shortname = raw.shortname === null ? null : `${raw.shortname}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class ArtistSummaryModel {
	id: string;
	logo: string;
	name: string;

	private static $build(raw) {
		const item = new ArtistSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.logo === undefined || (item.logo = raw.logo === null ? null : `${raw.logo}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class GraffitiSummaryModel {
	artist: ArtistSummaryModel;
	captures: GraffitiCaptureViewModel[];
	id: string;
	name: string;
	painted: Date;

	private static $build(raw) {
		const item = new GraffitiSummaryModel();
		raw.artist === undefined || (item.artist = raw.artist ? ArtistSummaryModel["$build"](raw.artist) : null)
		raw.captures === undefined || (item.captures = raw.captures ? raw.captures.map(i => GraffitiCaptureViewModel["$build"](i)) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.painted === undefined || (item.painted = raw.painted ? new Date(raw.painted) : null)
		
		return item;
	}
}

export class GraffitiCaptureViewModel {
	height: number;
	id: string;
	left: number;
	sourceId: string;
	top: number;
	width: number;

	private static $build(raw) {
		const item = new GraffitiCaptureViewModel();
		raw.height === undefined || (item.height = raw.height === null ? null : +raw.height)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.left === undefined || (item.left = raw.left === null ? null : +raw.left)
		raw.sourceId === undefined || (item.sourceId = raw.sourceId === null ? null : `${raw.sourceId}`)
		raw.top === undefined || (item.top = raw.top === null ? null : +raw.top)
		raw.width === undefined || (item.width = raw.width === null ? null : +raw.width)
		
		return item;
	}
}

export class RailcarModelSummaryModel {
	id: string;
	name: string;
	shortname: string;
	tag: string;

	private static $build(raw) {
		const item = new RailcarModelSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortname === undefined || (item.shortname = raw.shortname === null ? null : `${raw.shortname}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
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

export class GraffitiViewModel {
	artist: ArtistSummaryModel;
	captures: GraffitiCaptureViewModel[];
	railcar: RailcarSummaryModel;
	description: string;
	direction: RailcarDirection;
	id: string;
	name: string;
	painted: Date;

	private static $build(raw) {
		const item = new GraffitiViewModel();
		raw.artist === undefined || (item.artist = raw.artist ? ArtistSummaryModel["$build"](raw.artist) : null)
		raw.captures === undefined || (item.captures = raw.captures ? raw.captures.map(i => GraffitiCaptureViewModel["$build"](i)) : null)
		raw.railcar === undefined || (item.railcar = raw.railcar ? RailcarSummaryModel["$build"](raw.railcar) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.direction === undefined || (item.direction = raw.direction)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.painted === undefined || (item.painted = raw.painted ? new Date(raw.painted) : null)
		
		return item;
	}
}

export class RailcarModelViewModel {
	id: string;
	lengthIncludingBuffers: number;
	lengthIncludingCouplers: number;
	name: string;
	shortname: string;
	summary: string;
	tag: string;

	private static $build(raw) {
		const item = new RailcarModelViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.lengthIncludingBuffers === undefined || (item.lengthIncludingBuffers = raw.lengthIncludingBuffers === null ? null : +raw.lengthIncludingBuffers)
		raw.lengthIncludingCouplers === undefined || (item.lengthIncludingCouplers = raw.lengthIncludingCouplers === null ? null : +raw.lengthIncludingCouplers)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortname === undefined || (item.shortname = raw.shortname === null ? null : `${raw.shortname}`)
		raw.summary === undefined || (item.summary = raw.summary === null ? null : `${raw.summary}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class RailcarViewModel {
	manufacturer: CompanySummaryModel;
	model: RailcarModelViewModel;
	operator: CompanySummaryModel;
	owner: CompanySummaryModel;
	captures: CaptureViewModel[];
	graffitis: GraffitiSummaryModel[];
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
		raw.captures === undefined || (item.captures = raw.captures ? raw.captures.map(i => CaptureViewModel["$build"](i)) : null)
		raw.graffitis === undefined || (item.graffitis = raw.graffitis ? raw.graffitis.map(i => GraffitiSummaryModel["$build"](i)) : null)
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
	async get(tag: string): Promise<CompanySummaryModel> {
		const $data = new FormData();
		$data.append("phNGE2NjU4OTc3bTJrZnI0dT13ZD5mNj", Service.stringify(tag))

		return await fetch(Service.toURL("lnbWJha3E2MHt2dHRsZXQwY2J2MmMwaz"), {
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

export class GraffitiService {
	async getGraffiti(id: string): Promise<GraffitiViewModel> {
		const $data = new FormData();
		$data.append("M2d2xyaXJydHNjcGh4bW14dXM5dGU2NH", Service.stringify(id))

		return await fetch(Service.toURL("luZHczemxzMjVweHloYmg2MWIxdnhxaD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : GraffitiViewModel["$build"](d);
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