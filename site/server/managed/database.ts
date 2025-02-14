import { Entity, DbSet, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference, View, ViewSet } from 'vlquery';

export class CaptureQueryProxy extends QueryProxy {
	get railcar(): Partial<RailcarQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get captured(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get data(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mimeType(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get railcarId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Capture extends Entity<CaptureQueryProxy> {
	get railcar(): Partial<ForeignReference<Railcar>> { return this.$railcar; }
	captured: Date;
	data: Buffer;
	declare id: string;
	mimeType: string;
	railcarId: string;
	
	$$meta = {
		source: "capture",
		columns: {
			captured: { type: "timestamp", name: "captured" },
			data: { type: "bytea", name: "data" },
			id: { type: "uuid", name: "id" },
			mimeType: { type: "text", name: "mime_type" },
			railcarId: { type: "uuid", name: "railcar_id" }
		},
		get set(): DbSet<Capture, CaptureQueryProxy> { 
			return new DbSet<Capture, CaptureQueryProxy>(Capture, null);
		}
	};
	
	constructor() {
		super();
		
		this.$railcar = new ForeignReference<Railcar>(this, "railcarId", Railcar);
	}
	
	private $railcar: ForeignReference<Railcar>;

	set railcar(value: Partial<ForeignReference<Railcar>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.railcarId = value.id as string;
		} else {
			this.railcarId = null;
		}
	}

	
}
			
export class CompanyQueryProxy extends QueryProxy {
	get icon(): Partial<CompanyLogoQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get logo(): Partial<CompanyLogoQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get parent(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get iconId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get logoId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get parentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Company extends Entity<CompanyQueryProxy> {
	get icon(): Partial<ForeignReference<CompanyLogo>> { return this.$icon; }
	get logo(): Partial<ForeignReference<CompanyLogo>> { return this.$logo; }
	manufacturedRailcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		operatedRailcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		ownedRailcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		get parent(): Partial<ForeignReference<Company>> { return this.$parent; }
	children: PrimaryReference<Company, CompanyQueryProxy>;
		iconId: string;
	declare id: string;
	logoId: string;
	name: string;
	parentId: string;
	
	$$meta = {
		source: "company",
		columns: {
			iconId: { type: "uuid", name: "icon_id" },
			id: { type: "uuid", name: "id" },
			logoId: { type: "uuid", name: "logo_id" },
			name: { type: "text", name: "name" },
			parentId: { type: "uuid", name: "parent_id" }
		},
		get set(): DbSet<Company, CompanyQueryProxy> { 
			return new DbSet<Company, CompanyQueryProxy>(Company, null);
		}
	};
	
	constructor() {
		super();
		
		this.$icon = new ForeignReference<CompanyLogo>(this, "iconId", CompanyLogo);
	this.$logo = new ForeignReference<CompanyLogo>(this, "logoId", CompanyLogo);
	this.manufacturedRailcars = new PrimaryReference<Railcar, RailcarQueryProxy>(this, "manufacturerId", Railcar);
		this.operatedRailcars = new PrimaryReference<Railcar, RailcarQueryProxy>(this, "operatorId", Railcar);
		this.ownedRailcars = new PrimaryReference<Railcar, RailcarQueryProxy>(this, "ownerId", Railcar);
		this.$parent = new ForeignReference<Company>(this, "parentId", Company);
	this.children = new PrimaryReference<Company, CompanyQueryProxy>(this, "parentId", Company);
	}
	
	private $icon: ForeignReference<CompanyLogo>;

	set icon(value: Partial<ForeignReference<CompanyLogo>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.iconId = value.id as string;
		} else {
			this.iconId = null;
		}
	}

	private $logo: ForeignReference<CompanyLogo>;

	set logo(value: Partial<ForeignReference<CompanyLogo>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.logoId = value.id as string;
		} else {
			this.logoId = null;
		}
	}

	private $parent: ForeignReference<Company>;

	set parent(value: Partial<ForeignReference<Company>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.parentId = value.id as string;
		} else {
			this.parentId = null;
		}
	}

	
}
			
export class CompanyLogoQueryProxy extends QueryProxy {
	get data(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mimeType(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class CompanyLogo extends Entity<CompanyLogoQueryProxy> {
	data: Buffer;
	declare id: string;
	mimeType: string;
	
	$$meta = {
		source: "company_logo",
		columns: {
			data: { type: "bytea", name: "data" },
			id: { type: "uuid", name: "id" },
			mimeType: { type: "text", name: "mime_type" }
		},
		get set(): DbSet<CompanyLogo, CompanyLogoQueryProxy> { 
			return new DbSet<CompanyLogo, CompanyLogoQueryProxy>(CompanyLogo, null);
		}
	};
}
			
export class RailcarQueryProxy extends QueryProxy {
	get manufacturer(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get model(): Partial<RailcarModelQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get operator(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get owner(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get aquired(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get givenName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get manufacturerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get modelId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get note(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get operatorId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get runningNumber(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get salePrice(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Railcar extends Entity<RailcarQueryProxy> {
	get manufacturer(): Partial<ForeignReference<Company>> { return this.$manufacturer; }
	get model(): Partial<ForeignReference<RailcarModel>> { return this.$model; }
	get operator(): Partial<ForeignReference<Company>> { return this.$operator; }
	get owner(): Partial<ForeignReference<Company>> { return this.$owner; }
	captures: PrimaryReference<Capture, CaptureQueryProxy>;
		aquired: Date;
	givenName: string;
	declare id: string;
	manufacturerId: string;
	modelId: string;
	note: string;
	operatorId: string;
	ownerId: string;
	runningNumber: string;
	salePrice: number;
	tag: string;
	
	$$meta = {
		source: "railcar",
		columns: {
			aquired: { type: "timestamp", name: "aquired" },
			givenName: { type: "text", name: "given_name" },
			id: { type: "uuid", name: "id" },
			manufacturerId: { type: "uuid", name: "manufacturer_id" },
			modelId: { type: "uuid", name: "model_id" },
			note: { type: "text", name: "note" },
			operatorId: { type: "uuid", name: "operator_id" },
			ownerId: { type: "uuid", name: "owner_id" },
			runningNumber: { type: "text", name: "running_number" },
			salePrice: { type: "float4", name: "sale_price" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<Railcar, RailcarQueryProxy> { 
			return new DbSet<Railcar, RailcarQueryProxy>(Railcar, null);
		}
	};
	
	constructor() {
		super();
		
		this.$manufacturer = new ForeignReference<Company>(this, "manufacturerId", Company);
	this.$model = new ForeignReference<RailcarModel>(this, "modelId", RailcarModel);
	this.$operator = new ForeignReference<Company>(this, "operatorId", Company);
	this.$owner = new ForeignReference<Company>(this, "ownerId", Company);
	this.captures = new PrimaryReference<Capture, CaptureQueryProxy>(this, "railcarId", Capture);
	}
	
	private $manufacturer: ForeignReference<Company>;

	set manufacturer(value: Partial<ForeignReference<Company>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.manufacturerId = value.id as string;
		} else {
			this.manufacturerId = null;
		}
	}

	private $model: ForeignReference<RailcarModel>;

	set model(value: Partial<ForeignReference<RailcarModel>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.modelId = value.id as string;
		} else {
			this.modelId = null;
		}
	}

	private $operator: ForeignReference<Company>;

	set operator(value: Partial<ForeignReference<Company>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.operatorId = value.id as string;
		} else {
			this.operatorId = null;
		}
	}

	private $owner: ForeignReference<Company>;

	set owner(value: Partial<ForeignReference<Company>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.ownerId = value.id as string;
		} else {
			this.ownerId = null;
		}
	}

	
}
			
export class RailcarModelQueryProxy extends QueryProxy {
	get lengthIncludingBuffers(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get lengthIncludingCouplers(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortname(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class RailcarModel extends Entity<RailcarModelQueryProxy> {
	railcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		declare id: string;
	lengthIncludingBuffers: number;
	lengthIncludingCouplers: number;
	name: string;
	shortname: string;
	
	$$meta = {
		source: "railcar_model",
		columns: {
			id: { type: "uuid", name: "id" },
			lengthIncludingBuffers: { type: "float4", name: "length_including_buffers" },
			lengthIncludingCouplers: { type: "float4", name: "length_including_couplers" },
			name: { type: "text", name: "name" },
			shortname: { type: "text", name: "shortname" }
		},
		get set(): DbSet<RailcarModel, RailcarModelQueryProxy> { 
			return new DbSet<RailcarModel, RailcarModelQueryProxy>(RailcarModel, null);
		}
	};
	
	constructor() {
		super();
		
		this.railcars = new PrimaryReference<Railcar, RailcarQueryProxy>(this, "modelId", Railcar);
	}
}
			

export class DbContext {
	capture: DbSet<Capture, CaptureQueryProxy>;
	company: DbSet<Company, CompanyQueryProxy>;
	companyLogo: DbSet<CompanyLogo, CompanyLogoQueryProxy>;
	railcar: DbSet<Railcar, RailcarQueryProxy>;
	railcarModel: DbSet<RailcarModel, RailcarModelQueryProxy>;

	constructor(private runContext: RunContext) {
		this.capture = new DbSet<Capture, CaptureQueryProxy>(Capture, this.runContext);
		this.company = new DbSet<Company, CompanyQueryProxy>(Company, this.runContext);
		this.companyLogo = new DbSet<CompanyLogo, CompanyLogoQueryProxy>(CompanyLogo, this.runContext);
		this.railcar = new DbSet<Railcar, RailcarQueryProxy>(Railcar, this.runContext);
		this.railcarModel = new DbSet<RailcarModel, RailcarModelQueryProxy>(RailcarModel, this.runContext);
	}

	findSet(modelType) {
		for (let key in this) {
			if (this[key] instanceof DbSet) {
				if ((this[key] as any).modelConstructor == modelType) {
					return this[key];
				}
			}
		}
	}

	
};