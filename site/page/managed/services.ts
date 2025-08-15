export enum RailcarDirection {
	forward = "forward",
	reverse = "reverse"
}

export class CaptureViewModel {
	bufferAnchorOffset: number;
	captured: Date;
	corrupted: boolean;
	direction: RailcarDirection;
	id: string;

	private static $build(raw) {
		const item = new CaptureViewModel();
		raw.bufferAnchorOffset === undefined || (item.bufferAnchorOffset = raw.bufferAnchorOffset === null ? null : +raw.bufferAnchorOffset)
		raw.captured === undefined || (item.captured = raw.captured ? new Date(raw.captured) : null)
		raw.corrupted === undefined || (item.corrupted = !!raw.corrupted)
		raw.direction === undefined || (item.direction = raw.direction)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class CompanySummaryModel {
	iconId: string;
	id: string;
	name: string;
	shortname: string;
	tag: string;

	private static $build(raw) {
		const item = new CompanySummaryModel();
		raw.iconId === undefined || (item.iconId = raw.iconId === null ? null : `${raw.iconId}`)
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
	summary: string;
	tag: string;

	private static $build(raw) {
		const item = new ArtistSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.logo === undefined || (item.logo = raw.logo === null ? null : `${raw.logo}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.summary === undefined || (item.summary = raw.summary === null ? null : `${raw.summary}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class GraffitiSummaryModel {
	artist: ArtistSummaryModel;
	captures: GraffitiCaptureViewModel[];
	type: GraffitiTypeViewModel;
	direction: RailcarDirection;
	id: string;
	name: string;
	painted: Date;

	private static $build(raw) {
		const item = new GraffitiSummaryModel();
		raw.artist === undefined || (item.artist = raw.artist ? ArtistSummaryModel["$build"](raw.artist) : null)
		raw.captures === undefined || (item.captures = raw.captures ? raw.captures.map(i => GraffitiCaptureViewModel["$build"](i)) : null)
		raw.type === undefined || (item.type = raw.type ? GraffitiTypeViewModel["$build"](raw.type) : null)
		raw.direction === undefined || (item.direction = raw.direction)
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

export class GraffitiTypeViewModel {
	id: string;
	name: string;

	private static $build(raw) {
		const item = new GraffitiTypeViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class GraffitiInspirationSummaryModel {
	captured: Date;
	id: string;
	name: string;
	origin: string;
	paintingUrge: number;

	private static $build(raw) {
		const item = new GraffitiInspirationSummaryModel();
		raw.captured === undefined || (item.captured = raw.captured ? new Date(raw.captured) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.origin === undefined || (item.origin = raw.origin === null ? null : `${raw.origin}`)
		raw.paintingUrge === undefined || (item.paintingUrge = raw.paintingUrge === null ? null : +raw.paintingUrge)
		
		return item;
	}
}

export class GraffitiInspirationMediaViewModel {
	id: string;
	mimeType: string;

	private static $build(raw) {
		const item = new GraffitiInspirationMediaViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.mimeType === undefined || (item.mimeType = raw.mimeType === null ? null : `${raw.mimeType}`)
		
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

export class SessionViewModel {
	account: AccountViewModel;
	id: string;

	private static $build(raw) {
		const item = new SessionViewModel();
		raw.account === undefined || (item.account = raw.account ? AccountViewModel["$build"](raw.account) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class AccountViewModel {
	id: string;
	name: string;

	private static $build(raw) {
		const item = new AccountViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
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

export class CompanyViewModel {
	manufacturedRailcars: RailcarSummaryModel[];
	operatedRailcars: RailcarSummaryModel[];
	ownedRailcars: RailcarSummaryModel[];
	parent: CompanySummaryModel;
	description: string;
	iconId: string;
	id: string;
	name: string;
	shortname: string;
	tag: string;

	private static $build(raw) {
		const item = new CompanyViewModel();
		raw.manufacturedRailcars === undefined || (item.manufacturedRailcars = raw.manufacturedRailcars ? raw.manufacturedRailcars.map(i => RailcarSummaryModel["$build"](i)) : null)
		raw.operatedRailcars === undefined || (item.operatedRailcars = raw.operatedRailcars ? raw.operatedRailcars.map(i => RailcarSummaryModel["$build"](i)) : null)
		raw.ownedRailcars === undefined || (item.ownedRailcars = raw.ownedRailcars ? raw.ownedRailcars.map(i => RailcarSummaryModel["$build"](i)) : null)
		raw.parent === undefined || (item.parent = raw.parent ? CompanySummaryModel["$build"](raw.parent) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.iconId === undefined || (item.iconId = raw.iconId === null ? null : `${raw.iconId}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortname === undefined || (item.shortname = raw.shortname === null ? null : `${raw.shortname}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class ArtistViewModel {
	graffitis: GraffitiSummaryModel[];
	description: string;
	id: string;
	logo: string;
	name: string;
	origin: string;
	summary: string;
	tag: string;

	private static $build(raw) {
		const item = new ArtistViewModel();
		raw.graffitis === undefined || (item.graffitis = raw.graffitis ? raw.graffitis.map(i => GraffitiSummaryModel["$build"](i)) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.logo === undefined || (item.logo = raw.logo === null ? null : `${raw.logo}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.origin === undefined || (item.origin = raw.origin === null ? null : `${raw.origin}`)
		raw.summary === undefined || (item.summary = raw.summary === null ? null : `${raw.summary}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class GraffitiViewModel {
	artist: ArtistSummaryModel;
	captures: GraffitiCaptureViewModel[];
	railcar: GraffitiRailcarViewModel;
	type: GraffitiTypeViewModel;
	description: string;
	direction: RailcarDirection;
	id: string;
	name: string;
	painted: Date;

	private static $build(raw) {
		const item = new GraffitiViewModel();
		raw.artist === undefined || (item.artist = raw.artist ? ArtistSummaryModel["$build"](raw.artist) : null)
		raw.captures === undefined || (item.captures = raw.captures ? raw.captures.map(i => GraffitiCaptureViewModel["$build"](i)) : null)
		raw.railcar === undefined || (item.railcar = raw.railcar ? GraffitiRailcarViewModel["$build"](raw.railcar) : null)
		raw.type === undefined || (item.type = raw.type ? GraffitiTypeViewModel["$build"](raw.type) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.direction === undefined || (item.direction = raw.direction)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.painted === undefined || (item.painted = raw.painted ? new Date(raw.painted) : null)
		
		return item;
	}
}

export class GraffitiInspirationViewModel {
	artist: ArtistSummaryModel;
	media: GraffitiInspirationMediaViewModel[];
	paintings: GraffitiSummaryModel[];
	captured: Date;
	description: string;
	id: string;
	name: string;
	origin: string;
	paintingEffort: number;
	paintingUrge: number;

	private static $build(raw) {
		const item = new GraffitiInspirationViewModel();
		raw.artist === undefined || (item.artist = raw.artist ? ArtistSummaryModel["$build"](raw.artist) : null)
		raw.media === undefined || (item.media = raw.media ? raw.media.map(i => GraffitiInspirationMediaViewModel["$build"](i)) : null)
		raw.paintings === undefined || (item.paintings = raw.paintings ? raw.paintings.map(i => GraffitiSummaryModel["$build"](i)) : null)
		raw.captured === undefined || (item.captured = raw.captured ? new Date(raw.captured) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.origin === undefined || (item.origin = raw.origin === null ? null : `${raw.origin}`)
		raw.paintingEffort === undefined || (item.paintingEffort = raw.paintingEffort === null ? null : +raw.paintingEffort)
		raw.paintingUrge === undefined || (item.paintingUrge = raw.paintingUrge === null ? null : +raw.paintingUrge)
		
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

export class GraffitiRailcarViewModel {
	model: RailcarModelSummaryModel;
	graffitis: GraffitiSummaryModel[];
	givenName: string;
	id: string;
	runningNumber: string;
	tag: string;

	private static $build(raw) {
		const item = new GraffitiRailcarViewModel();
		raw.model === undefined || (item.model = raw.model ? RailcarModelSummaryModel["$build"](raw.model) : null)
		raw.graffitis === undefined || (item.graffitis = raw.graffitis ? raw.graffitis.map(i => GraffitiSummaryModel["$build"](i)) : null)
		raw.givenName === undefined || (item.givenName = raw.givenName === null ? null : `${raw.givenName}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.runningNumber === undefined || (item.runningNumber = raw.runningNumber === null ? null : `${raw.runningNumber}`)
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
	async get(tag: string): Promise<CompanyViewModel> {
		const $data = new FormData();
		$data.append("p3ZXR5aTF5cjJtMjlxd2BvamozNDRmMm", Service.stringify(tag))

		return await fetch(Service.toURL("UwcGBkdXY5NjVteXZ3NmF1bXZlMjcxM2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : CompanyViewModel["$build"](d);
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

	async getArtist(tag: string): Promise<ArtistViewModel> {
		const $data = new FormData();
		$data.append("c4dDRvd2cwaGEzYWc1dHF3Z2BvensyNT", Service.stringify(tag))

		return await fetch(Service.toURL("FqYnJwcDw5NmFybzY5ajIyamFheHZodm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : ArtistViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getArtists(): Promise<Array<ArtistViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("Q1eDA2YTg2dWFwMzhtY2FwOWR3cDNobX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ArtistViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getSourceCaptures(id: string): Promise<Array<CaptureViewModel>> {
		const $data = new FormData();
		$data.append("1kemNjbGd5YXdxMHkyc2t6eHo3emNyeW", Service.stringify(id))

		return await fetch(Service.toURL("lnejh3dXVsb2BiYTp4bDI2aHRqYWdpdX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : CaptureViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getTypes(): Promise<Array<GraffitiTypeViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("VzNzA2emFmaWRheTQzemhpeXR0bWJ2dX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : GraffitiTypeViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getInspirations(): Promise<Array<GraffitiInspirationSummaryModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("szdzxrd3hzc29xa3NiYzU2ZWV3ajgyMz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : GraffitiInspirationSummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getInspiration(id: string): Promise<GraffitiInspirationViewModel> {
		const $data = new FormData();
		$data.append("BwbTU5aXIxd2pkOXR6MmhrdWU4MzA1N2", Service.stringify(id))

		return await fetch(Service.toURL("ppeXJ4cmhqOHd1amE2a29mYmR4NTIxbm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : GraffitiInspirationViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async createInspiration(data: Blob, mimeType: string): Promise<string> {
		const $data = new FormData();
		$data.append("BzeHhhd2Z3M2JhcGk4NWxwbWJhNTFrdD", data)
		$data.append("xzMmE5ZXE2dWMwMGkwZmdqaTBuemVjM3", Service.stringify(mimeType))

		return await fetch(Service.toURL("Q1N2BlY3V2dHtsc3Z0NWMwYTN2bDhkaW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async saveInpiration(inspirationViewModel: GraffitiInspirationViewModel, artistId: string): Promise<void> {
		const $data = new FormData();
		$data.append("Bva2dleTlxNjtmZWIxbHJiY3J4c3Zya3", Service.stringify(inspirationViewModel))
		$data.append("54cDh2MH96a2hjbGJqYnFlYTF1MXJhej", Service.stringify(artistId))

		return await fetch(Service.toURL("40ZnAwbjJ3N3Fqc3U1ejR4Y3ZuNTI0bD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async register(railcarId: string, name: string, description: string, typeId: string, painted: Date, side: string, artistId: string): Promise<string> {
		const $data = new FormData();
		$data.append("hqNGlzN3A1aXRleTU4dnF5bWtrMDM5eT", Service.stringify(railcarId))
		$data.append("M4ZTZnb3NhbWI0OGNtdWY3YmJxbGh5OD", Service.stringify(name))
		$data.append("NsN3kxbX5saWVya3dyeWdjYTU3dmNsdj", Service.stringify(description))
		$data.append("VsMXdleXQ5NWE2YmZvZTFlOTlxaXVoaW", Service.stringify(typeId))
		$data.append("dmNmE5dm9ta3c4NmgyZmw4NnllZTFpaT", Service.stringify(painted))
		$data.append("Z2bTc0MWJ5OWJjZWpsbjszdXk1aXhmZn", Service.stringify(side))
		$data.append("RuYjZhM2J3aWQ5NXU4YmVhamY5ZnUyOT", Service.stringify(artistId))

		return await fetch(Service.toURL("dsZWVqY3M1cHFiZTU1c2VscWdxZWJ4dz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async assign(graffitiId: string, captureModel: GraffitiCaptureViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("hiZHpkejpldXlraD1xOGZ1dnB2MWV4eG", Service.stringify(graffitiId))
		$data.append("9ianV0d2QxZ2QzM2p4NmMyaGE2ZGZzdm", Service.stringify(captureModel))

		return await fetch(Service.toURL("JsMnZhdDB2aDQxNnZqNmZoeTBoejd2MT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
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

	async setAnchor(captureId: string, offset: number): Promise<void> {
		const $data = new FormData();
		$data.append("JieHJpcHhvaTJ6bHMzMHJtY3F1bnl4MT", Service.stringify(captureId))
		$data.append("x0MWg5aTlsZ2hlNDFsdzJicGBsdnp1Nm", Service.stringify(offset))

		return await fetch(Service.toURL("M4a3A2amg4emIxeD5jNjFycTRmYXQxcD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}
}

export class SessionService {
	async getSession(): Promise<SessionViewModel> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("NhbXltY3IxcnBmNWM2eDpoZ2Joc3FpaX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : SessionViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async login(mail: string, password: string): Promise<SessionViewModel> {
		const $data = new FormData();
		$data.append("R4a2VuMGZ0MmlnNmkyZGdxZDFwMWBjbz", Service.stringify(mail))
		$data.append("JoOGpqNGkyMTV6OTVxeWZpZDI2NnA3MG", Service.stringify(password))

		return await fetch(Service.toURL("p5bTdkd2J2OGNnaXxicmt5amdpZXExcW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : SessionViewModel["$build"](d);
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