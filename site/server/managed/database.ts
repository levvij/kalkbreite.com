import { Entity, DbSet, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference, View, ViewSet } from 'vlquery';

export class RailcarDirection extends QueryEnum {
	static readonly forward = "forward";
	static readonly reverse = "reverse";
}

export class AccountQueryProxy extends QueryProxy {
	get email(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get passwordHash(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get salt(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Account extends Entity<AccountQueryProxy> {
	sessions: PrimaryReference<Session, SessionQueryProxy>;
		email: string;
	declare id: string;
	name: string;
	passwordHash: string;
	salt: string;
	
	$$meta = {
		source: "account",
		columns: {
			email: { type: "text", name: "email" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			passwordHash: { type: "text", name: "password_hash" },
			salt: { type: "text", name: "salt" }
		},
		get set(): DbSet<Account, AccountQueryProxy> { 
			return new DbSet<Account, AccountQueryProxy>(Account, null);
		}
	};
	
	constructor() {
		super();
		
		this.sessions = new PrimaryReference<Session, SessionQueryProxy>(this, "accountId", Session);
	}
}
			
export class ArtistQueryProxy extends QueryProxy {
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get logo(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get origin(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get real(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get summary(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Artist extends Entity<ArtistQueryProxy> {
	graffitis: PrimaryReference<Graffiti, GraffitiQueryProxy>;
		originals: PrimaryReference<GraffitiInspiration, GraffitiInspirationQueryProxy>;
		description: string;
	declare id: string;
	logo: string;
	name: string;
	origin: string;
	real: boolean;
	summary: string;
	tag: string;
	
	$$meta = {
		source: "artist",
		columns: {
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			logo: { type: "text", name: "logo" },
			name: { type: "text", name: "name" },
			origin: { type: "text", name: "origin" },
			real: { type: "bool", name: "real" },
			summary: { type: "text", name: "summary" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<Artist, ArtistQueryProxy> { 
			return new DbSet<Artist, ArtistQueryProxy>(Artist, null);
		}
	};
	
	constructor() {
		super();
		
		this.graffitis = new PrimaryReference<Graffiti, GraffitiQueryProxy>(this, "artistId", Graffiti);
		this.originals = new PrimaryReference<GraffitiInspiration, GraffitiInspirationQueryProxy>(this, "artistId", GraffitiInspiration);
	}
}
			
export class CaptureQueryProxy extends QueryProxy {
	get railcar(): Partial<RailcarQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bufferAnchorOffset(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get captured(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get corrupted(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get data(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get direction(): "forward" | "reverse" { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mimeType(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get railcarId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get thumbnail(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Capture extends Entity<CaptureQueryProxy> {
	get railcar(): Partial<ForeignReference<Railcar>> { return this.$railcar; }
	bufferAnchorOffset: number;
	captured: Date;
	corrupted: boolean;
	data: Buffer;
	direction: RailcarDirection;
	declare id: string;
	mimeType: string;
	railcarId: string;
	thumbnail: Buffer;
	
	$$meta = {
		source: "capture",
		columns: {
			bufferAnchorOffset: { type: "float4", name: "buffer_anchor_offset" },
			captured: { type: "timestamp", name: "captured" },
			corrupted: { type: "bool", name: "corrupted" },
			data: { type: "bytea", name: "data" },
			direction: { type: "railcar_direction", name: "direction" },
			id: { type: "uuid", name: "id" },
			mimeType: { type: "text", name: "mime_type" },
			railcarId: { type: "uuid", name: "railcar_id" },
			thumbnail: { type: "bytea", name: "thumbnail" }
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
			
export class CaptureFrameQueryProxy extends QueryProxy {
	get session(): Partial<CaptureSessionQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get data(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get offsetX(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get offsetY(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sessionId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get thumbnail(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get uploaded(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class CaptureFrame extends Entity<CaptureFrameQueryProxy> {
	get session(): Partial<ForeignReference<CaptureSession>> { return this.$session; }
	data: Buffer;
	declare id: string;
	offsetX: number;
	offsetY: number;
	sessionId: string;
	thumbnail: Buffer;
	uploaded: Date;
	
	$$meta = {
		source: "capture_frame",
		columns: {
			data: { type: "bytea", name: "data" },
			id: { type: "uuid", name: "id" },
			offsetX: { type: "int4", name: "offset_x" },
			offsetY: { type: "int4", name: "offset_y" },
			sessionId: { type: "uuid", name: "session_id" },
			thumbnail: { type: "bytea", name: "thumbnail" },
			uploaded: { type: "timestamp", name: "uploaded" }
		},
		get set(): DbSet<CaptureFrame, CaptureFrameQueryProxy> { 
			return new DbSet<CaptureFrame, CaptureFrameQueryProxy>(CaptureFrame, null);
		}
	};
	
	constructor() {
		super();
		
		this.$session = new ForeignReference<CaptureSession>(this, "sessionId", CaptureSession);
	}
	
	private $session: ForeignReference<CaptureSession>;

	set session(value: Partial<ForeignReference<CaptureSession>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.sessionId = value.id as string;
		} else {
			this.sessionId = null;
		}
	}

	
}
			
export class CaptureSessionQueryProxy extends QueryProxy {
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class CaptureSession extends Entity<CaptureSessionQueryProxy> {
	frames: PrimaryReference<CaptureFrame, CaptureFrameQueryProxy>;
		created: Date;
	declare id: string;
	
	$$meta = {
		source: "capture_session",
		columns: {
			created: { type: "timestamp", name: "created" },
			id: { type: "uuid", name: "id" }
		},
		get set(): DbSet<CaptureSession, CaptureSessionQueryProxy> { 
			return new DbSet<CaptureSession, CaptureSessionQueryProxy>(CaptureSession, null);
		}
	};
	
	constructor() {
		super();
		
		this.frames = new PrimaryReference<CaptureFrame, CaptureFrameQueryProxy>(this, "sessionId", CaptureFrame);
	}
}
			
export class CompanyQueryProxy extends QueryProxy {
	get icon(): Partial<CompanyLogoQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get logo(): Partial<CompanyLogoQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get parent(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get iconId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get logoId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get parentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortname(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Company extends Entity<CompanyQueryProxy> {
	get icon(): Partial<ForeignReference<CompanyLogo>> { return this.$icon; }
	get logo(): Partial<ForeignReference<CompanyLogo>> { return this.$logo; }
	manufacturedRailcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		operatedRailcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		ownedRailcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		get parent(): Partial<ForeignReference<Company>> { return this.$parent; }
	children: PrimaryReference<Company, CompanyQueryProxy>;
		description: string;
	iconId: string;
	declare id: string;
	logoId: string;
	name: string;
	parentId: string;
	shortname: string;
	tag: string;
	
	$$meta = {
		source: "company",
		columns: {
			description: { type: "text", name: "description" },
			iconId: { type: "uuid", name: "icon_id" },
			id: { type: "uuid", name: "id" },
			logoId: { type: "uuid", name: "logo_id" },
			name: { type: "text", name: "name" },
			parentId: { type: "uuid", name: "parent_id" },
			shortname: { type: "text", name: "shortname" },
			tag: { type: "text", name: "tag" }
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
			
export class CouplerQueryProxy extends QueryProxy {
	
}

export class Coupler extends Entity<CouplerQueryProxy> {
	declare id: string;
	
	$$meta = {
		source: "coupler",
		columns: {
			id: { type: "uuid", name: "id" }
		},
		get set(): DbSet<Coupler, CouplerQueryProxy> { 
			return new DbSet<Coupler, CouplerQueryProxy>(Coupler, null);
		}
	};
}
			
export class CouplingQueryProxy extends QueryProxy {
	get source(): Partial<CouplerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get target(): Partial<CouplerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get coupled(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sourceId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get targetId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Coupling extends Entity<CouplingQueryProxy> {
	get source(): Partial<ForeignReference<Coupler>> { return this.$source; }
	get target(): Partial<ForeignReference<Coupler>> { return this.$target; }
	coupled: Date;
	declare id: string;
	sourceId: string;
	targetId: string;
	
	$$meta = {
		source: "coupling",
		columns: {
			coupled: { type: "timestamp", name: "coupled" },
			id: { type: "uuid", name: "id" },
			sourceId: { type: "uuid", name: "source_id" },
			targetId: { type: "uuid", name: "target_id" }
		},
		get set(): DbSet<Coupling, CouplingQueryProxy> { 
			return new DbSet<Coupling, CouplingQueryProxy>(Coupling, null);
		}
	};
	
	constructor() {
		super();
		
		this.$source = new ForeignReference<Coupler>(this, "sourceId", Coupler);
	this.$target = new ForeignReference<Coupler>(this, "targetId", Coupler);
	}
	
	private $source: ForeignReference<Coupler>;

	set source(value: Partial<ForeignReference<Coupler>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.sourceId = value.id as string;
		} else {
			this.sourceId = null;
		}
	}

	private $target: ForeignReference<Coupler>;

	set target(value: Partial<ForeignReference<Coupler>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.targetId = value.id as string;
		} else {
			this.targetId = null;
		}
	}

	
}
			
export class GraffitiQueryProxy extends QueryProxy {
	get artist(): Partial<ArtistQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get graffitiInspiration(): Partial<GraffitiInspirationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get railcar(): Partial<RailcarQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): Partial<GraffitiTypeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get artistId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get direction(): "forward" | "reverse" { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get graffitiInspirationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get painted(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get railcarId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get typeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Graffiti extends Entity<GraffitiQueryProxy> {
	get artist(): Partial<ForeignReference<Artist>> { return this.$artist; }
	captures: PrimaryReference<GraffitiCapture, GraffitiCaptureQueryProxy>;
		get graffitiInspiration(): Partial<ForeignReference<GraffitiInspiration>> { return this.$graffitiInspiration; }
	get railcar(): Partial<ForeignReference<Railcar>> { return this.$railcar; }
	get type(): Partial<ForeignReference<GraffitiType>> { return this.$type; }
	artistId: string;
	description: string;
	direction: RailcarDirection;
	graffitiInspirationId: string;
	declare id: string;
	name: string;
	painted: Date;
	railcarId: string;
	typeId: string;
	
	$$meta = {
		source: "graffiti",
		columns: {
			artistId: { type: "uuid", name: "artist_id" },
			description: { type: "text", name: "description" },
			direction: { type: "railcar_direction", name: "direction" },
			graffitiInspirationId: { type: "uuid", name: "graffiti_inspiration_id" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			painted: { type: "timestamp", name: "painted" },
			railcarId: { type: "uuid", name: "railcar_id" },
			typeId: { type: "uuid", name: "type_id" }
		},
		get set(): DbSet<Graffiti, GraffitiQueryProxy> { 
			return new DbSet<Graffiti, GraffitiQueryProxy>(Graffiti, null);
		}
	};
	
	constructor() {
		super();
		
		this.$artist = new ForeignReference<Artist>(this, "artistId", Artist);
	this.captures = new PrimaryReference<GraffitiCapture, GraffitiCaptureQueryProxy>(this, "graffitiId", GraffitiCapture);
		this.$graffitiInspiration = new ForeignReference<GraffitiInspiration>(this, "graffitiInspirationId", GraffitiInspiration);
	this.$railcar = new ForeignReference<Railcar>(this, "railcarId", Railcar);
	this.$type = new ForeignReference<GraffitiType>(this, "typeId", GraffitiType);
	}
	
	private $artist: ForeignReference<Artist>;

	set artist(value: Partial<ForeignReference<Artist>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.artistId = value.id as string;
		} else {
			this.artistId = null;
		}
	}

	private $graffitiInspiration: ForeignReference<GraffitiInspiration>;

	set graffitiInspiration(value: Partial<ForeignReference<GraffitiInspiration>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.graffitiInspirationId = value.id as string;
		} else {
			this.graffitiInspirationId = null;
		}
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

	private $type: ForeignReference<GraffitiType>;

	set type(value: Partial<ForeignReference<GraffitiType>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.typeId = value.id as string;
		} else {
			this.typeId = null;
		}
	}

	
}
			
export class GraffitiCaptureQueryProxy extends QueryProxy {
	get capture(): Partial<CaptureQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get graffiti(): Partial<GraffitiQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get graffitiId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get height(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get left(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sourceId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get thumbnail(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get top(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get width(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class GraffitiCapture extends Entity<GraffitiCaptureQueryProxy> {
	get capture(): Partial<ForeignReference<Capture>> { return this.$capture; }
	get graffiti(): Partial<ForeignReference<Graffiti>> { return this.$graffiti; }
	graffitiId: string;
	height: number;
	declare id: string;
	left: number;
	sourceId: string;
	thumbnail: Buffer;
	top: number;
	width: number;
	
	$$meta = {
		source: "graffiti_capture",
		columns: {
			graffitiId: { type: "uuid", name: "graffiti_id" },
			height: { type: "float4", name: "height" },
			id: { type: "uuid", name: "id" },
			left: { type: "float4", name: "left" },
			sourceId: { type: "uuid", name: "source_id" },
			thumbnail: { type: "bytea", name: "thumbnail" },
			top: { type: "float4", name: "top" },
			width: { type: "float4", name: "width" }
		},
		get set(): DbSet<GraffitiCapture, GraffitiCaptureQueryProxy> { 
			return new DbSet<GraffitiCapture, GraffitiCaptureQueryProxy>(GraffitiCapture, null);
		}
	};
	
	constructor() {
		super();
		
		this.$capture = new ForeignReference<Capture>(this, "sourceId", Capture);
	this.$graffiti = new ForeignReference<Graffiti>(this, "graffitiId", Graffiti);
	}
	
	private $capture: ForeignReference<Capture>;

	set capture(value: Partial<ForeignReference<Capture>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.sourceId = value.id as string;
		} else {
			this.sourceId = null;
		}
	}

	private $graffiti: ForeignReference<Graffiti>;

	set graffiti(value: Partial<ForeignReference<Graffiti>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.graffitiId = value.id as string;
		} else {
			this.graffitiId = null;
		}
	}

	
}
			
export class GraffitiInspirationQueryProxy extends QueryProxy {
	get artist(): Partial<ArtistQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get artistId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get captured(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get origin(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get paintingEffort(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get paintingUrge(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class GraffitiInspiration extends Entity<GraffitiInspirationQueryProxy> {
	get artist(): Partial<ForeignReference<Artist>> { return this.$artist; }
	media: PrimaryReference<GraffitiInspirationMedia, GraffitiInspirationMediaQueryProxy>;
		paintings: PrimaryReference<Graffiti, GraffitiQueryProxy>;
		artistId: string;
	captured: Date;
	description: string;
	declare id: string;
	name: string;
	origin: string;
	paintingEffort: number;
	paintingUrge: number;
	
	$$meta = {
		source: "graffiti_inspiration",
		columns: {
			artistId: { type: "uuid", name: "artist_id" },
			captured: { type: "timestamp", name: "captured" },
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			origin: { type: "text", name: "origin" },
			paintingEffort: { type: "float4", name: "painting_effort" },
			paintingUrge: { type: "float4", name: "painting_urge" }
		},
		get set(): DbSet<GraffitiInspiration, GraffitiInspirationQueryProxy> { 
			return new DbSet<GraffitiInspiration, GraffitiInspirationQueryProxy>(GraffitiInspiration, null);
		}
	};
	
	constructor() {
		super();
		
		this.$artist = new ForeignReference<Artist>(this, "artistId", Artist);
	this.media = new PrimaryReference<GraffitiInspirationMedia, GraffitiInspirationMediaQueryProxy>(this, "graffitiInspirationId", GraffitiInspirationMedia);
		this.paintings = new PrimaryReference<Graffiti, GraffitiQueryProxy>(this, "graffitiInspirationId", Graffiti);
	}
	
	private $artist: ForeignReference<Artist>;

	set artist(value: Partial<ForeignReference<Artist>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.artistId = value.id as string;
		} else {
			this.artistId = null;
		}
	}

	
}
			
export class GraffitiInspirationMediaQueryProxy extends QueryProxy {
	get graffitiInspiration(): Partial<GraffitiInspirationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get data(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get graffitiInspirationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mimeType(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get uploaded(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class GraffitiInspirationMedia extends Entity<GraffitiInspirationMediaQueryProxy> {
	get graffitiInspiration(): Partial<ForeignReference<GraffitiInspiration>> { return this.$graffitiInspiration; }
	data: Buffer;
	graffitiInspirationId: string;
	declare id: string;
	mimeType: string;
	uploaded: Date;
	
	$$meta = {
		source: "graffiti_inspiration_media",
		columns: {
			data: { type: "bytea", name: "data" },
			graffitiInspirationId: { type: "uuid", name: "graffiti_inspiration_id" },
			id: { type: "uuid", name: "id" },
			mimeType: { type: "text", name: "mime_type" },
			uploaded: { type: "timestamp", name: "uploaded" }
		},
		get set(): DbSet<GraffitiInspirationMedia, GraffitiInspirationMediaQueryProxy> { 
			return new DbSet<GraffitiInspirationMedia, GraffitiInspirationMediaQueryProxy>(GraffitiInspirationMedia, null);
		}
	};
	
	constructor() {
		super();
		
		this.$graffitiInspiration = new ForeignReference<GraffitiInspiration>(this, "graffitiInspirationId", GraffitiInspiration);
	}
	
	private $graffitiInspiration: ForeignReference<GraffitiInspiration>;

	set graffitiInspiration(value: Partial<ForeignReference<GraffitiInspiration>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.graffitiInspirationId = value.id as string;
		} else {
			this.graffitiInspirationId = null;
		}
	}

	
}
			
export class GraffitiTypeQueryProxy extends QueryProxy {
	get complexity(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class GraffitiType extends Entity<GraffitiTypeQueryProxy> {
	graffitis: PrimaryReference<Graffiti, GraffitiQueryProxy>;
		complexity: number;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "graffiti_type",
		columns: {
			complexity: { type: "int4", name: "complexity" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<GraffitiType, GraffitiTypeQueryProxy> { 
			return new DbSet<GraffitiType, GraffitiTypeQueryProxy>(GraffitiType, null);
		}
	};
	
	constructor() {
		super();
		
		this.graffitis = new PrimaryReference<Graffiti, GraffitiQueryProxy>(this, "typeId", Graffiti);
	}
}
			
export class RailcarQueryProxy extends QueryProxy {
	get headCoupler(): Partial<CouplerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get manufacturer(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get model(): Partial<RailcarModelQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get operator(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get owner(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get storageContainer(): Partial<StorageContainerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tailCoupler(): Partial<CouplerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get aquired(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get givenName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get headCouplerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get manufacturerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get modelId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get note(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get operatorId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get runningNumber(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get salePrice(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get storageContainerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tailCouplerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Railcar extends Entity<RailcarQueryProxy> {
	get headCoupler(): Partial<ForeignReference<Coupler>> { return this.$headCoupler; }
	get manufacturer(): Partial<ForeignReference<Company>> { return this.$manufacturer; }
	get model(): Partial<ForeignReference<RailcarModel>> { return this.$model; }
	get operator(): Partial<ForeignReference<Company>> { return this.$operator; }
	get owner(): Partial<ForeignReference<Company>> { return this.$owner; }
	captures: PrimaryReference<Capture, CaptureQueryProxy>;
		graffitis: PrimaryReference<Graffiti, GraffitiQueryProxy>;
		get storageContainer(): Partial<ForeignReference<StorageContainer>> { return this.$storageContainer; }
	get tailCoupler(): Partial<ForeignReference<Coupler>> { return this.$tailCoupler; }
	aquired: Date;
	givenName: string;
	headCouplerId: string;
	declare id: string;
	manufacturerId: string;
	modelId: string;
	note: string;
	operatorId: string;
	ownerId: string;
	runningNumber: string;
	salePrice: number;
	storageContainerId: string;
	tag: string;
	tailCouplerId: string;
	
	$$meta = {
		source: "railcar",
		columns: {
			aquired: { type: "timestamp", name: "aquired" },
			givenName: { type: "text", name: "given_name" },
			headCouplerId: { type: "uuid", name: "head_coupler_id" },
			id: { type: "uuid", name: "id" },
			manufacturerId: { type: "uuid", name: "manufacturer_id" },
			modelId: { type: "uuid", name: "model_id" },
			note: { type: "text", name: "note" },
			operatorId: { type: "uuid", name: "operator_id" },
			ownerId: { type: "uuid", name: "owner_id" },
			runningNumber: { type: "text", name: "running_number" },
			salePrice: { type: "float4", name: "sale_price" },
			storageContainerId: { type: "uuid", name: "storage_container_id" },
			tag: { type: "text", name: "tag" },
			tailCouplerId: { type: "uuid", name: "tail_coupler_id" }
		},
		get set(): DbSet<Railcar, RailcarQueryProxy> { 
			return new DbSet<Railcar, RailcarQueryProxy>(Railcar, null);
		}
	};
	
	constructor() {
		super();
		
		this.$headCoupler = new ForeignReference<Coupler>(this, "headCouplerId", Coupler);
	this.$manufacturer = new ForeignReference<Company>(this, "manufacturerId", Company);
	this.$model = new ForeignReference<RailcarModel>(this, "modelId", RailcarModel);
	this.$operator = new ForeignReference<Company>(this, "operatorId", Company);
	this.$owner = new ForeignReference<Company>(this, "ownerId", Company);
	this.captures = new PrimaryReference<Capture, CaptureQueryProxy>(this, "railcarId", Capture);
		this.graffitis = new PrimaryReference<Graffiti, GraffitiQueryProxy>(this, "railcarId", Graffiti);
		this.$storageContainer = new ForeignReference<StorageContainer>(this, "storageContainerId", StorageContainer);
	this.$tailCoupler = new ForeignReference<Coupler>(this, "tailCouplerId", Coupler);
	}
	
	private $headCoupler: ForeignReference<Coupler>;

	set headCoupler(value: Partial<ForeignReference<Coupler>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.headCouplerId = value.id as string;
		} else {
			this.headCouplerId = null;
		}
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

	private $storageContainer: ForeignReference<StorageContainer>;

	set storageContainer(value: Partial<ForeignReference<StorageContainer>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.storageContainerId = value.id as string;
		} else {
			this.storageContainerId = null;
		}
	}

	private $tailCoupler: ForeignReference<Coupler>;

	set tailCoupler(value: Partial<ForeignReference<Coupler>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.tailCouplerId = value.id as string;
		} else {
			this.tailCouplerId = null;
		}
	}

	
}
			
export class RailcarModelQueryProxy extends QueryProxy {
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get lengthIncludingBuffers(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get lengthIncludingCouplers(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortname(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get summary(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get uicIdentifier(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class RailcarModel extends Entity<RailcarModelQueryProxy> {
	railcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		drawings: PrimaryReference<RailcarModelDrawing, RailcarModelDrawingQueryProxy>;
		description: string;
	declare id: string;
	lengthIncludingBuffers: number;
	lengthIncludingCouplers: number;
	name: string;
	shortname: string;
	summary: string;
	tag: string;
	uicIdentifier: string;
	
	$$meta = {
		source: "railcar_model",
		columns: {
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			lengthIncludingBuffers: { type: "float4", name: "length_including_buffers" },
			lengthIncludingCouplers: { type: "float4", name: "length_including_couplers" },
			name: { type: "text", name: "name" },
			shortname: { type: "text", name: "shortname" },
			summary: { type: "text", name: "summary" },
			tag: { type: "text", name: "tag" },
			uicIdentifier: { type: "text", name: "uic_identifier" }
		},
		get set(): DbSet<RailcarModel, RailcarModelQueryProxy> { 
			return new DbSet<RailcarModel, RailcarModelQueryProxy>(RailcarModel, null);
		}
	};
	
	constructor() {
		super();
		
		this.railcars = new PrimaryReference<Railcar, RailcarQueryProxy>(this, "modelId", Railcar);
		this.drawings = new PrimaryReference<RailcarModelDrawing, RailcarModelDrawingQueryProxy>(this, "railcarModelId", RailcarModelDrawing);
	}
}
			
export class RailcarModelDrawingQueryProxy extends QueryProxy {
	get railcarModel(): Partial<RailcarModelQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get image(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get railcarModelId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get source(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class RailcarModelDrawing extends Entity<RailcarModelDrawingQueryProxy> {
	get railcarModel(): Partial<ForeignReference<RailcarModel>> { return this.$railcarModel; }
	declare id: string;
	image: Buffer;
	name: string;
	railcarModelId: string;
	source: string;
	
	$$meta = {
		source: "railcar_model_drawing",
		columns: {
			id: { type: "uuid", name: "id" },
			image: { type: "bytea", name: "image" },
			name: { type: "text", name: "name" },
			railcarModelId: { type: "uuid", name: "railcar_model_id" },
			source: { type: "text", name: "source" }
		},
		get set(): DbSet<RailcarModelDrawing, RailcarModelDrawingQueryProxy> { 
			return new DbSet<RailcarModelDrawing, RailcarModelDrawingQueryProxy>(RailcarModelDrawing, null);
		}
	};
	
	constructor() {
		super();
		
		this.$railcarModel = new ForeignReference<RailcarModel>(this, "railcarModelId", RailcarModel);
	}
	
	private $railcarModel: ForeignReference<RailcarModel>;

	set railcarModel(value: Partial<ForeignReference<RailcarModel>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.railcarModelId = value.id as string;
		} else {
			this.railcarModelId = null;
		}
	}

	
}
			
export class SessionQueryProxy extends QueryProxy {
	get account(): Partial<AccountQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get accountId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get key(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get opened(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Session extends Entity<SessionQueryProxy> {
	get account(): Partial<ForeignReference<Account>> { return this.$account; }
	accountId: string;
	declare id: string;
	key: string;
	opened: Date;
	
	$$meta = {
		source: "session",
		columns: {
			accountId: { type: "uuid", name: "account_id" },
			id: { type: "uuid", name: "id" },
			key: { type: "text", name: "key" },
			opened: { type: "timestamp", name: "opened" }
		},
		get set(): DbSet<Session, SessionQueryProxy> { 
			return new DbSet<Session, SessionQueryProxy>(Session, null);
		}
	};
	
	constructor() {
		super();
		
		this.$account = new ForeignReference<Account>(this, "accountId", Account);
	}
	
	private $account: ForeignReference<Account>;

	set account(value: Partial<ForeignReference<Account>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.accountId = value.id as string;
		} else {
			this.accountId = null;
		}
	}

	
}
			
export class StorageContainerQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class StorageContainer extends Entity<StorageContainerQueryProxy> {
	railcars: PrimaryReference<Railcar, RailcarQueryProxy>;
		declare id: string;
	name: string;
	tag: string;
	
	$$meta = {
		source: "storage_container",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<StorageContainer, StorageContainerQueryProxy> { 
			return new DbSet<StorageContainer, StorageContainerQueryProxy>(StorageContainer, null);
		}
	};
	
	constructor() {
		super();
		
		this.railcars = new PrimaryReference<Railcar, RailcarQueryProxy>(this, "storageContainerId", Railcar);
	}
}
			
export class UicIdentifierClassQueryProxy extends QueryProxy {
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class UicIdentifierClass extends Entity<UicIdentifierClassQueryProxy> {
	code: string;
	description: string;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "uic_identifier_class",
		columns: {
			code: { type: "text", name: "code" },
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<UicIdentifierClass, UicIdentifierClassQueryProxy> { 
			return new DbSet<UicIdentifierClass, UicIdentifierClassQueryProxy>(UicIdentifierClass, null);
		}
	};
}
			
export class UicIdentifierIndexLetterQueryProxy extends QueryProxy {
	get classFilter(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class UicIdentifierIndexLetter extends Entity<UicIdentifierIndexLetterQueryProxy> {
	classFilter: string;
	code: string;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "uic_identifier_index_letter",
		columns: {
			classFilter: { type: "text", name: "class_filter" },
			code: { type: "text", name: "code" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<UicIdentifierIndexLetter, UicIdentifierIndexLetterQueryProxy> { 
			return new DbSet<UicIdentifierIndexLetter, UicIdentifierIndexLetterQueryProxy>(UicIdentifierIndexLetter, null);
		}
	};
}
			
export class UncouplingQueryProxy extends QueryProxy {
	get source(): Partial<CouplerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sourceId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get uncoupled(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Uncoupling extends Entity<UncouplingQueryProxy> {
	get source(): Partial<ForeignReference<Coupler>> { return this.$source; }
	declare id: string;
	sourceId: string;
	uncoupled: Date;
	
	$$meta = {
		source: "uncoupling",
		columns: {
			id: { type: "uuid", name: "id" },
			sourceId: { type: "uuid", name: "source_id" },
			uncoupled: { type: "timestamp", name: "uncoupled" }
		},
		get set(): DbSet<Uncoupling, UncouplingQueryProxy> { 
			return new DbSet<Uncoupling, UncouplingQueryProxy>(Uncoupling, null);
		}
	};
	
	constructor() {
		super();
		
		this.$source = new ForeignReference<Coupler>(this, "sourceId", Coupler);
	}
	
	private $source: ForeignReference<Coupler>;

	set source(value: Partial<ForeignReference<Coupler>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.sourceId = value.id as string;
		} else {
			this.sourceId = null;
		}
	}

	
}
			

export class DbContext {
	account: DbSet<Account, AccountQueryProxy>;
	artist: DbSet<Artist, ArtistQueryProxy>;
	capture: DbSet<Capture, CaptureQueryProxy>;
	captureFrame: DbSet<CaptureFrame, CaptureFrameQueryProxy>;
	captureSession: DbSet<CaptureSession, CaptureSessionQueryProxy>;
	company: DbSet<Company, CompanyQueryProxy>;
	companyLogo: DbSet<CompanyLogo, CompanyLogoQueryProxy>;
	coupler: DbSet<Coupler, CouplerQueryProxy>;
	coupling: DbSet<Coupling, CouplingQueryProxy>;
	graffiti: DbSet<Graffiti, GraffitiQueryProxy>;
	graffitiCapture: DbSet<GraffitiCapture, GraffitiCaptureQueryProxy>;
	graffitiInspiration: DbSet<GraffitiInspiration, GraffitiInspirationQueryProxy>;
	graffitiInspirationMedia: DbSet<GraffitiInspirationMedia, GraffitiInspirationMediaQueryProxy>;
	graffitiType: DbSet<GraffitiType, GraffitiTypeQueryProxy>;
	railcar: DbSet<Railcar, RailcarQueryProxy>;
	railcarModel: DbSet<RailcarModel, RailcarModelQueryProxy>;
	railcarModelDrawing: DbSet<RailcarModelDrawing, RailcarModelDrawingQueryProxy>;
	session: DbSet<Session, SessionQueryProxy>;
	storageContainer: DbSet<StorageContainer, StorageContainerQueryProxy>;
	uicIdentifierClass: DbSet<UicIdentifierClass, UicIdentifierClassQueryProxy>;
	uicIdentifierIndexLetter: DbSet<UicIdentifierIndexLetter, UicIdentifierIndexLetterQueryProxy>;
	uncoupling: DbSet<Uncoupling, UncouplingQueryProxy>;

	constructor(private runContext: RunContext) {
		this.account = new DbSet<Account, AccountQueryProxy>(Account, this.runContext);
		this.artist = new DbSet<Artist, ArtistQueryProxy>(Artist, this.runContext);
		this.capture = new DbSet<Capture, CaptureQueryProxy>(Capture, this.runContext);
		this.captureFrame = new DbSet<CaptureFrame, CaptureFrameQueryProxy>(CaptureFrame, this.runContext);
		this.captureSession = new DbSet<CaptureSession, CaptureSessionQueryProxy>(CaptureSession, this.runContext);
		this.company = new DbSet<Company, CompanyQueryProxy>(Company, this.runContext);
		this.companyLogo = new DbSet<CompanyLogo, CompanyLogoQueryProxy>(CompanyLogo, this.runContext);
		this.coupler = new DbSet<Coupler, CouplerQueryProxy>(Coupler, this.runContext);
		this.coupling = new DbSet<Coupling, CouplingQueryProxy>(Coupling, this.runContext);
		this.graffiti = new DbSet<Graffiti, GraffitiQueryProxy>(Graffiti, this.runContext);
		this.graffitiCapture = new DbSet<GraffitiCapture, GraffitiCaptureQueryProxy>(GraffitiCapture, this.runContext);
		this.graffitiInspiration = new DbSet<GraffitiInspiration, GraffitiInspirationQueryProxy>(GraffitiInspiration, this.runContext);
		this.graffitiInspirationMedia = new DbSet<GraffitiInspirationMedia, GraffitiInspirationMediaQueryProxy>(GraffitiInspirationMedia, this.runContext);
		this.graffitiType = new DbSet<GraffitiType, GraffitiTypeQueryProxy>(GraffitiType, this.runContext);
		this.railcar = new DbSet<Railcar, RailcarQueryProxy>(Railcar, this.runContext);
		this.railcarModel = new DbSet<RailcarModel, RailcarModelQueryProxy>(RailcarModel, this.runContext);
		this.railcarModelDrawing = new DbSet<RailcarModelDrawing, RailcarModelDrawingQueryProxy>(RailcarModelDrawing, this.runContext);
		this.session = new DbSet<Session, SessionQueryProxy>(Session, this.runContext);
		this.storageContainer = new DbSet<StorageContainer, StorageContainerQueryProxy>(StorageContainer, this.runContext);
		this.uicIdentifierClass = new DbSet<UicIdentifierClass, UicIdentifierClassQueryProxy>(UicIdentifierClass, this.runContext);
		this.uicIdentifierIndexLetter = new DbSet<UicIdentifierIndexLetter, UicIdentifierIndexLetterQueryProxy>(UicIdentifierIndexLetter, this.runContext);
		this.uncoupling = new DbSet<Uncoupling, UncouplingQueryProxy>(Uncoupling, this.runContext);
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