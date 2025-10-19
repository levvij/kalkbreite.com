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

export class MaintenanceSummaryModel {
	completed: Date;
	id: string;
	opened: Date;
	title: string;

	private static $build(raw) {
		const item = new MaintenanceSummaryModel();
		raw.completed === undefined || (item.completed = raw.completed ? new Date(raw.completed) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.opened === undefined || (item.opened = raw.opened ? new Date(raw.opened) : null)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class UicIdentifierClassViewModel {
	code: string;
	name: string;

	private static $build(raw) {
		const item = new UicIdentifierClassViewModel();
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class UicIdentifierIndexLetterViewModel {
	classFilter: string;
	code: string;
	name: string;
	uicLocaleId: string;

	private static $build(raw) {
		const item = new UicIdentifierIndexLetterViewModel();
		raw.classFilter === undefined || (item.classFilter = raw.classFilter === null ? null : `${raw.classFilter}`)
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.uicLocaleId === undefined || (item.uicLocaleId = raw.uicLocaleId === null ? null : `${raw.uicLocaleId}`)
		
		return item;
	}
}

export class UicLocaleViewModel {
	id: string;
	name: string;

	private static $build(raw) {
		const item = new UicLocaleViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class CouplerViewModel {
	type: CouplerTypeSummaryModel;
	id: string;

	private static $build(raw) {
		const item = new CouplerViewModel();
		raw.type === undefined || (item.type = raw.type ? CouplerTypeSummaryModel["$build"](raw.type) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class CouplerTypeSummaryModel {
	icon: string;
	id: string;

	private static $build(raw) {
		const item = new CouplerTypeSummaryModel();
		raw.icon === undefined || (item.icon = raw.icon === null ? null : `${raw.icon}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
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

export class RailcarModelDrawingSummaryModel {
	id: string;
	name: string;
	source: string;

	private static $build(raw) {
		const item = new RailcarModelDrawingSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.source === undefined || (item.source = raw.source === null ? null : `${raw.source}`)
		
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

export class CouplingViewModel {
	coupled: Date;
	id: string;
	sourceId: string;
	targetId: string;

	private static $build(raw) {
		const item = new CouplingViewModel();
		raw.coupled === undefined || (item.coupled = raw.coupled ? new Date(raw.coupled) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.sourceId === undefined || (item.sourceId = raw.sourceId === null ? null : `${raw.sourceId}`)
		raw.targetId === undefined || (item.targetId = raw.targetId === null ? null : `${raw.targetId}`)
		
		return item;
	}
}

export class TrainViewModel {
	changed: Date;
	identifier: string;
	created: Date;
	length: number;

	private static $build(raw) {
		const item = new TrainViewModel();
		raw.changed === undefined || (item.changed = raw.changed ? new Date(raw.changed) : null)
		raw.identifier === undefined || (item.identifier = raw.identifier === null ? null : `${raw.identifier}`)
		raw.created === undefined || (item.created = raw.created ? new Date(raw.created) : null)
		raw.length === undefined || (item.length = raw.length === null ? null : +raw.length)
		
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

export class MaintenanceViewModel {
	railcar: RailcarSummaryModel;
	completed: Date;
	cost: number;
	description: string;
	id: string;
	issue: string;
	opened: Date;
	title: string;

	private static $build(raw) {
		const item = new MaintenanceViewModel();
		raw.railcar === undefined || (item.railcar = raw.railcar ? RailcarSummaryModel["$build"](raw.railcar) : null)
		raw.completed === undefined || (item.completed = raw.completed ? new Date(raw.completed) : null)
		raw.cost === undefined || (item.cost = raw.cost === null ? null : +raw.cost)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.issue === undefined || (item.issue = raw.issue === null ? null : `${raw.issue}`)
		raw.opened === undefined || (item.opened = raw.opened ? new Date(raw.opened) : null)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class RailcarModelViewModel {
	drawings: RailcarModelSummaryModel[];
	uicLocale: UicLocaleViewModel;
	id: string;
	lengthIncludingBuffers: number;
	lengthIncludingCouplers: number;
	name: string;
	shortname: string;
	summary: string;
	tag: string;
	uicIdentifier: string;

	private static $build(raw) {
		const item = new RailcarModelViewModel();
		raw.drawings === undefined || (item.drawings = raw.drawings ? raw.drawings.map(i => RailcarModelSummaryModel["$build"](i)) : null)
		raw.uicLocale === undefined || (item.uicLocale = raw.uicLocale ? UicLocaleViewModel["$build"](raw.uicLocale) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.lengthIncludingBuffers === undefined || (item.lengthIncludingBuffers = raw.lengthIncludingBuffers === null ? null : +raw.lengthIncludingBuffers)
		raw.lengthIncludingCouplers === undefined || (item.lengthIncludingCouplers = raw.lengthIncludingCouplers === null ? null : +raw.lengthIncludingCouplers)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortname === undefined || (item.shortname = raw.shortname === null ? null : `${raw.shortname}`)
		raw.summary === undefined || (item.summary = raw.summary === null ? null : `${raw.summary}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		raw.uicIdentifier === undefined || (item.uicIdentifier = raw.uicIdentifier === null ? null : `${raw.uicIdentifier}`)
		
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
	headCoupler: CouplerViewModel;
	manufacturer: CompanySummaryModel;
	model: RailcarModelViewModel;
	operator: CompanySummaryModel;
	owner: CompanySummaryModel;
	captures: CaptureViewModel[];
	graffitis: GraffitiSummaryModel[];
	maintenanceJobs: MaintenanceSummaryModel[];
	storageContainer: StorageContainerSummaryModel;
	tailCoupler: CouplerViewModel;
	aquired: Date;
	givenName: string;
	id: string;
	note: string;
	runningNumber: string;
	tag: string;

	private static $build(raw) {
		const item = new RailcarViewModel();
		raw.headCoupler === undefined || (item.headCoupler = raw.headCoupler ? CouplerViewModel["$build"](raw.headCoupler) : null)
		raw.manufacturer === undefined || (item.manufacturer = raw.manufacturer ? CompanySummaryModel["$build"](raw.manufacturer) : null)
		raw.model === undefined || (item.model = raw.model ? RailcarModelViewModel["$build"](raw.model) : null)
		raw.operator === undefined || (item.operator = raw.operator ? CompanySummaryModel["$build"](raw.operator) : null)
		raw.owner === undefined || (item.owner = raw.owner ? CompanySummaryModel["$build"](raw.owner) : null)
		raw.captures === undefined || (item.captures = raw.captures ? raw.captures.map(i => CaptureViewModel["$build"](i)) : null)
		raw.graffitis === undefined || (item.graffitis = raw.graffitis ? raw.graffitis.map(i => GraffitiSummaryModel["$build"](i)) : null)
		raw.maintenanceJobs === undefined || (item.maintenanceJobs = raw.maintenanceJobs ? raw.maintenanceJobs.map(i => MaintenanceSummaryModel["$build"](i)) : null)
		raw.storageContainer === undefined || (item.storageContainer = raw.storageContainer ? StorageContainerSummaryModel["$build"](raw.storageContainer) : null)
		raw.tailCoupler === undefined || (item.tailCoupler = raw.tailCoupler ? CouplerViewModel["$build"](raw.tailCoupler) : null)
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

export class TrainRailcarUnitViewModel {
	model: RailcarModelSummaryModel;
	operator: CompanySummaryModel;
	owner: CompanySummaryModel;
	storageContainer: StorageContainerSummaryModel;
	givenName: string;
	id: string;
	runningNumber: string;
	tag: string;

	private static $build(raw) {
		const item = new TrainRailcarUnitViewModel();
		raw.model === undefined || (item.model = raw.model ? RailcarModelSummaryModel["$build"](raw.model) : null)
		raw.operator === undefined || (item.operator = raw.operator ? CompanySummaryModel["$build"](raw.operator) : null)
		raw.owner === undefined || (item.owner = raw.owner ? CompanySummaryModel["$build"](raw.owner) : null)
		raw.storageContainer === undefined || (item.storageContainer = raw.storageContainer ? StorageContainerSummaryModel["$build"](raw.storageContainer) : null)
		raw.givenName === undefined || (item.givenName = raw.givenName === null ? null : `${raw.givenName}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.runningNumber === undefined || (item.runningNumber = raw.runningNumber === null ? null : `${raw.runningNumber}`)
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

export class IncidentService {
	async reportDecoupling(section: string, position: number, couplerId: string, failed: Date): Promise<void> {
		const $data = new FormData();
		$data.append("Nyc2xqNmNkOWd0MXx3N3F2MDdoM3RjMm", Service.stringify(section))
		$data.append("l5cGM0Y3EwOXd6bHp5cGpkM2I4anZ1ZH", Service.stringify(position))
		$data.append("xoMD12dnh3Nj9waTFkb3dmY3c4aDQ5bX", Service.stringify(couplerId))
		$data.append("k5ejIyejNzb2FsYTB2Y3JrMWk1djR2OG", Service.stringify(failed))

		return await fetch(Service.toURL("R1aXd5ZGF4MjB1OXR4dGJ0cDc5czZucX"), {
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

	async reportDerailment(section: string, position: number, railcarId: string, failed: Date): Promise<void> {
		const $data = new FormData();
		$data.append("pxOG8zbGY4ODRubmJ5cjFjb3lpZT4ya2", Service.stringify(section))
		$data.append("p3OTw0YWp6eWM1NnNqZWFzZmYwZTlwZG", Service.stringify(position))
		$data.append("NxejQ1bXE1cmhnMHBtYTprODdzc3N5Zn", Service.stringify(railcarId))
		$data.append("hraWdneWx3NnNyM2F3aDh2a2NxNnV0YW", Service.stringify(failed))

		return await fetch(Service.toURL("lremFlenJmcXFuNDNwMGx1c3ZhMmdkZH"), {
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

	async reportCollision(section: string, position: number, sourceId: string, targetId: string, failed: Date): Promise<void> {
		const $data = new FormData();
		$data.append("h0bWVncHJuNGBiZWU0dn90cnRhN2BvYj", Service.stringify(section))
		$data.append("k5aXtraGNqbnFiMWdqYmlybTNvOGJkej", Service.stringify(position))
		$data.append("JrZWUya2RxYzZ4aGluZXNlNWMwMmFhZG", Service.stringify(sourceId))
		$data.append("dzOGVpc201OTcxaXMxbHYwb2E5OGd2dj", Service.stringify(targetId))
		$data.append("8yaj92c3dhc2RnbmRicTZwd3hhNXp3ZX", Service.stringify(failed))

		return await fetch(Service.toURL("F1NmB5aWdyeWl0cWB4aGU2MjhqazZvcD"), {
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

	async reportPowerLoss(section: string, position: number, railcarId: string, failed: Date): Promise<void> {
		const $data = new FormData();
		$data.append("IyZnV5bWdzemM2bnQyZms1cmRuanQ2cm", Service.stringify(section))
		$data.append("pkYn80Mn41dWhtY2dhcD1yNmNmOGZ6bT", Service.stringify(position))
		$data.append("JoZmdjcDpqbGh2bHF5aHNyMnN1NHs4dW", Service.stringify(railcarId))
		$data.append("M3dDRiaXdkODZzNnx5eXh2emM3a3Y3a3", Service.stringify(failed))

		return await fetch(Service.toURL("djc3lyazI3ZWJoNXxxd2N1cTQxOHVlcX"), {
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

export class MaintenanceService {
	async get(id: string): Promise<MaintenanceViewModel> {
		const $data = new FormData();
		$data.append("1ubzlvbjFiMGZveDVveWV6cXUya2pzZT", Service.stringify(id))

		return await fetch(Service.toURL("5xMzJuNGJ3ZDdsOT9hOHYxM3oweml1bj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : MaintenanceViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async open(railcarId: string): Promise<string> {
		const $data = new FormData();
		$data.append("NraXFwYWcyamRiaWlhNWgxM3FoZWU0Mj", Service.stringify(railcarId))

		return await fetch(Service.toURL("Zlcm42OWVwcmQ5en5oZHIwcDl0cmVzZz"), {
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

	async save(viewModel: MaintenanceViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("hycjg0cHFmeWN4NWphenF6ejNkOGh2aH", Service.stringify(viewModel))

		return await fetch(Service.toURL("hxbWd2dT42aDZycjs5djB6ZmdraGtlbn"), {
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

	async complete(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("04bDZ0N3lveGp5Y2JvYWI5b2A0cTh6ZX", Service.stringify(id))

		return await fetch(Service.toURL("Jyd2V1N2pzZzIzYmRzcDp2Z256a2U4d2"), {
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

export class RailcarModelService {
	async getModel(tag: string): Promise<RailcarModelViewModel> {
		const $data = new FormData();
		$data.append("1wbmJxdmkzanZsbzV4YWEwa34ydDs2c2", Service.stringify(tag))

		return await fetch(Service.toURL("cxZGJtaGBzY3t5bntiZmVmdzZ5bDYxbD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : RailcarModelViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getRailcars(modelId: string): Promise<Array<RailcarSummaryModel>> {
		const $data = new FormData();
		$data.append("Y2aWNtZjIxNHxlcj1jYTk1Y39iM2VpM2", Service.stringify(modelId))

		return await fetch(Service.toURL("g1c2NhNjNvM3BlODw2NzN3dnJpcmdtMW"), {
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

	async getUicClasses(): Promise<Array<UicIdentifierClassViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("pnZW16NWRreHdmb2hpdWl5YWdodzM4NW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : UicIdentifierClassViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getUicIndexLetters(localeId: string): Promise<Array<UicIdentifierIndexLetterViewModel>> {
		const $data = new FormData();
		$data.append("NhdXE0dzR5dTJ0Z21xZDg0djQ5OGJieH", Service.stringify(localeId))

		return await fetch(Service.toURL("dlb3JtcmNyYTJzeGAyMGJhemR2NGo5cD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : UicIdentifierIndexLetterViewModel["$build"](d));
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

export class TrainService {
	async uncoupleAfter(railcarId: string): Promise<void> {
		const $data = new FormData();
		$data.append("RmYjhpMnhrcXRhY2E4M2M1YjVpcGF2aG", Service.stringify(railcarId))

		return await fetch(Service.toURL("dpZGNpcXprMWV5aDVpb3BsaDU1Z2FreW"), {
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

	async couple(sourceTrainIdentifier: string, sourceAnchor: string, targetTrainIdentifier: string, targetAnchor: string): Promise<void> {
		const $data = new FormData();
		$data.append("ZxMGU5Mnlpd2BlZzo4eXFycXJ1OWpjcD", Service.stringify(sourceTrainIdentifier))
		$data.append("IzZ2lqNmZ3eWZqaXhnMnlwczVwNGg3OW", Service.stringify(sourceAnchor))
		$data.append("ZmMzUydGRjZXVxbXd0Z2F6dHF3cTI4Mz", Service.stringify(targetTrainIdentifier))
		$data.append("hwcDV2bTo5aWZlaDlxNTU2ZmVhMjEyZT", Service.stringify(targetAnchor))

		return await fetch(Service.toURL("p1ZGExaDh2ZzlibTUxamFteTVwcDZtMz"), {
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

	async getTrains(): Promise<Array<TrainViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("FpZXZtYWR5eGRiZzlqMDhyYXRra3M5b2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : TrainViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getTrain(identifier: string): Promise<Array<RailcarSummaryModel>> {
		const $data = new FormData();
		$data.append("F5Z3U5ZXFxeWd3cHY3MmA3YXB2MnV4Zn", Service.stringify(identifier))

		return await fetch(Service.toURL("lzOGlqcTd0eWhnYTZ0Y2A3czJsYm95cj"), {
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

	async getUnitTrain(railcarId: string): Promise<string> {
		const $data = new FormData();
		$data.append("10czNubHltczN4cXhubmRxNzdiMWR0b3", Service.stringify(railcarId))

		return await fetch(Service.toURL("lrcDJxc3wya2t2bGZlOHMxdTQ3OXI2cH"), {
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
}