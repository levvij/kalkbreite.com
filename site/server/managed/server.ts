import { BaseServer, ViewModel, Inject } from "vlserver";

import { DbContext } from "././database";
import { CompanySummaryModel } from "././../company/company";
import { CompanyViewModel } from "././../company/company";
import { CompanyService } from "././../company/index";
import { Graffiti } from "././database";
import { GraffitiInspiration } from "././database";
import { GraffitiInspirationMedia } from "././database";
import { RailcarDirection } from "././database";
import { GraffitiCaptureViewModel } from "././../graffiti/graffiti";
import { GraffitiSummaryModel } from "././../graffiti/graffiti";
import { GraffitiTypeViewModel } from "././../graffiti/graffiti";
import { GraffitiViewModel } from "././../graffiti/graffiti";
import { CaptureViewModel } from "././../capture/capture";
import { cropGraffiti } from "././../../shared/crop-graffiti";
import { ArtistSummaryModel } from "././../graffiti/artist";
import { ArtistViewModel } from "././../graffiti/artist";
import { GraffitiInspirationSummaryModel } from "././../graffiti/inspiration";
import { GraffitiInspirationViewModel } from "././../graffiti/inspiration";
import { GraffitiService } from "././../graffiti/index";
import { CollisionIncident } from "././database";
import { DecouplingIncident } from "././database";
import { DerailingIncident } from "././database";
import { PowerLossIncident } from "././database";
import { DecouplingIncidentViewModel } from "././../incident/decoupling";
import { PowerLossIncidentViewModel } from "././../incident/power-loss";
import { CollisionIncidentViewModel } from "././../incident/collision";
import { DerailingIncidentViewModel } from "././../incident/derailing";
import { IncidentService } from "././../incident/index";
import { CameraViewModel } from "././../live/camera";
import { LiveService } from "././../live/index";
import { MaintenanceViewModel } from "././../maintenace/maintenace";
import { Maintenance } from "././database";
import { MaintenanceService } from "././../maintenace/index";
import { UicIdentifierIndexLetter } from "././database";
import { RailcarModelSummaryModel } from "././../railcar/model";
import { RailcarModelViewModel } from "././../railcar/model";
import { RailcarSummaryModel } from "././../railcar/railcar";
import { UicIdentifierClassViewModel } from "././../model/uic-identifier";
import { UicIdentifierIndexLetterViewModel } from "././../model/uic-identifier";
import { RailcarModelService } from "././../model/index";
import { Coupler } from "././database";
import { Railcar } from "././database";
import { RailcarComission } from "././database";
import { RailcarWithdrawal } from "././database";
import { RailcarViewModel } from "././../railcar/railcar";
import { updateThumbnail } from "././../capture/thumbnail";
import { CouplerTypeSummaryModel } from "././../railcar/coupler";
import { CouplerTypeViewModel } from "././../railcar/coupler";
import { CouplingViewModel } from "././../train/coupling";
import { Application } from "././..";
import { RailcarService } from "././../railcar/index";
import { SearchManager } from "././../search/term";
import { SearchService } from "././../search/index";
import { Session } from "././database";
import { SessionViewModel } from "././../session/session";
import { RequestContext } from "././../session/context";
import { Authentication } from "././../session/authentication";
import { SessionService } from "././../session/index";
import { StorageContainerViewModel } from "././../storage/storage-contaiuner";
import { StorageService } from "././../storage/index";
import { Coupling } from "././database";
import { TrainLabel } from "././database";
import { Uncoupling } from "././database";
import { TrainResponse } from "././../train/train";
import { TrainViewModel } from "././../train/train";
import { TrainProductBrandSummaryModel } from "././../train/product-brand";
import { TrainLabelViewModel } from "././../train/label";
import { TrainState } from "././../train/state";
import { TrainStateViewModel } from "././../train/state";
import { LastTrainHeadPositionViewModel } from "././../train/position";
import { LastTrainPosition } from "././../train/position";
import { TrainRailcarUnitViewModel } from "././../train/unit";
import { TrainService } from "././../train/index";
import { GraffitiInspirationMediaViewModel } from "./../graffiti/inspiration";
import { MaintenanceSummaryModel } from "./../maintenace/maintenace";
import { CargoSlotViewModel } from "./../model/cargo";
import { CargoFixtureViewModel } from "./../model/cargo";
import { CargoLoadTypeViewModel } from "./../model/cargo";
import { UicLocaleViewModel } from "./../model/uic-identifier";
import { RailcarCargoLoadViewModel } from "./../railcar/cargo";
import { CouplerViewModel } from "./../railcar/coupler";
import { RailcarModelDrawingSummaryModel } from "./../railcar/model";
import { RailcarComissionViewModel } from "./../railcar/storage";
import { RailcarWithdrawalViewModel } from "./../railcar/storage";
import { AccountViewModel } from "./../session/session";
import { StorageContainerSummaryModel } from "./../storage/storage-contaiuner";
import { TrainHeadPositionViewModel } from "./../train/position";
import { GraffitiRailcarViewModel } from "./../railcar/railcar";
import { TrainProductBrandViewModel } from "./../train/product-brand";
import { Capture } from "./../managed/database";
import { Company } from "./../managed/database";
import { Artist } from "./../managed/database";
import { GraffitiCapture } from "./../managed/database";
import { GraffitiType } from "./../managed/database";
import { Camera } from "./../managed/database";
import { CargoSlot } from "./../managed/database";
import { CargoFixture } from "./../managed/database";
import { CargoLoadType } from "./../managed/database";
import { UicIdentifierClass } from "./../managed/database";
import { UicLocale } from "./../managed/database";
import { CargoLoad } from "./../managed/database";
import { CouplerType } from "./../managed/database";
import { RailcarModel } from "./../managed/database";
import { RailcarModelDrawing } from "./../managed/database";
import { Account } from "./../managed/database";
import { StorageContainer } from "./../managed/database";
import { TrainHeadPosition } from "./../managed/database";
import { TrainProductBrand } from "./../managed/database";

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
	"IncidentService": {
		objectConstructor: IncidentService,
		parameters: ["DbContext"]
	},
	"LiveService": {
		objectConstructor: LiveService,
		parameters: ["DbContext"]
	},
	"MaintenanceService": {
		objectConstructor: MaintenanceService,
		parameters: ["DbContext"]
	},
	"RailcarModelService": {
		objectConstructor: RailcarModelService,
		parameters: ["DbContext"]
	},
	"RailcarService": {
		objectConstructor: RailcarService,
		parameters: ["DbContext"]
	},
	"SearchService": {
		objectConstructor: SearchService,
		parameters: ["SearchManager"]
	},
	"SearchManager": {
		objectConstructor: SearchManager,
		parameters: []
	},
	"SessionService": {
		objectConstructor: SessionService,
		parameters: ["DbContext","Session","Authentication"]
	},
	"Session": {
		objectConstructor: Session,
		parameters: []
	},
	"Authentication": {
		objectConstructor: Authentication,
		parameters: ["Account"]
	},
	"StorageService": {
		objectConstructor: StorageService,
		parameters: ["DbContext"]
	},
	"TrainService": {
		objectConstructor: TrainService,
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
			"gzZGd3aWZ1ZTE5ZDZudTA0dDc5dWZ5Z3",
			{},
			inject => inject.construct(CompanyService),
			(controller, params) => controller.list(
				
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
			"Q1eDA2YTg2dWFwMzhtY2FwOWR3cDNobX",
			{},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getArtists(
				
			)
		);

		this.expose(
			"l3ZTkybzZzbGNtNX5laWBraWo1cG9qNm",
			{},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getFeaturedArtists(
				
			)
		);

		this.expose(
			"U2N2UyeTc3Z3l1a2o2ZG1tdmYzNmk3cG",
			{},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getGraffitis(
				
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
			"VzNzA2emFmaWRheTQzemhpeXR0bWJ2dX",
			{},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getTypes(
				
			)
		);

		this.expose(
			"szdzxrd3hzc29xa3NiYzU2ZWV3ajgyMz",
			{},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getInspirations(
				
			)
		);

		this.expose(
			"ppeXJ4cmhqOHd1amE2a29mYmR4NTIxbm",
			{
			"BwbTU5aXIxd2pkOXR6MmhrdWU4MzA1N2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getInspiration(
				params["BwbTU5aXIxd2pkOXR6MmhrdWU4MzA1N2"]
			)
		);

		this.expose(
			"RyMHVxb3NtNTVmaXBlMWlrYTg0ZnM3eT",
			{
			"M1Z2BpanZmbWFxczY5NzkzcnEyZntman": { type: "buffer", isArray: false, isOptional: false },
				"50Z2VhcjVrZGRraHNud2JpN25uaDBrOH": { type: "string", isArray: false, isOptional: false },
				"c0YWx1NmR0Zmk0cGZ6MjdlcntuanNpeG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.createInspiration(
				params["M1Z2BpanZmbWFxczY5NzkzcnEyZntman"],
				params["50Z2VhcjVrZGRraHNud2JpN25uaDBrOH"],
				params["c0YWx1NmR0Zmk0cGZ6MjdlcntuanNpeG"]
			)
		);

		this.expose(
			"40ZnAwbjJ3N3Fqc3U1ejR4Y3ZuNTI0bD",
			{
			"Bva2dleTlxNjtmZWIxbHJiY3J4c3Zya3": { type: GraffitiInspirationViewModel, isArray: false, isOptional: false },
				"54cDh2MH96a2hjbGJqYnFlYTF1MXJhej": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.saveInpiration(
				params["Bva2dleTlxNjtmZWIxbHJiY3J4c3Zya3"],
				params["54cDh2MH96a2hjbGJqYnFlYTF1MXJhej"]
			)
		);

		this.expose(
			"1xY2o2eDpkczZqbDV5aGhpdHd1a2ltZX",
			{
			"ZjeG1teHc1aWdkdGpoY2Nnb3JkMTFoam": { type: "string", isArray: false, isOptional: false },
				"VlbWEwa3Z3b2N5dTJ6anB5aTtla2gzeT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.assignInspiration(
				params["ZjeG1teHc1aWdkdGpoY2Nnb3JkMTFoam"],
				params["VlbWEwa3Z3b2N5dTJ6anB5aTtla2gzeT"]
			)
		);

		this.expose(
			"dsZWVqY3M1cHFiZTU1c2VscWdxZWJ4dz",
			{
			"hqNGlzN3A1aXRleTU4dnF5bWtrMDM5eT": { type: "string", isArray: false, isOptional: false },
				"M4ZTZnb3NhbWI0OGNtdWY3YmJxbGh5OD": { type: "string", isArray: false, isOptional: false },
				"NsN3kxbX5saWVya3dyeWdjYTU3dmNsdj": { type: "string", isArray: false, isOptional: false },
				"VsMXdleXQ5NWE2YmZvZTFlOTlxaXVoaW": { type: "string", isArray: false, isOptional: false },
				"dmNmE5dm9ta3c4NmgyZmw4NnllZTFpaT": { type: "date", isArray: false, isOptional: false },
				"Z2bTc0MWJ5OWJjZWpsbjszdXk1aXhmZn": { type: "string", isArray: false, isOptional: false },
				"RuYjZhM2J3aWQ5NXU4YmVhamY5ZnUyOT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.register(
				params["hqNGlzN3A1aXRleTU4dnF5bWtrMDM5eT"],
				params["M4ZTZnb3NhbWI0OGNtdWY3YmJxbGh5OD"],
				params["NsN3kxbX5saWVya3dyeWdjYTU3dmNsdj"],
				params["VsMXdleXQ5NWE2YmZvZTFlOTlxaXVoaW"],
				params["dmNmE5dm9ta3c4NmgyZmw4NnllZTFpaT"],
				params["Z2bTc0MWJ5OWJjZWpsbjszdXk1aXhmZn"],
				params["RuYjZhM2J3aWQ5NXU4YmVhamY5ZnUyOT"]
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
			"R1aXd5ZGF4MjB1OXR4dGJ0cDc5czZucX",
			{
			"Nyc2xqNmNkOWd0MXx3N3F2MDdoM3RjMm": { type: "string", isArray: false, isOptional: false },
				"l5cGM0Y3EwOXd6bHp5cGpkM2I4anZ1ZH": { type: "number", isArray: false, isOptional: false },
				"xoMD12dnh3Nj9waTFkb3dmY3c4aDQ5bX": { type: "string", isArray: false, isOptional: false },
				"k5ejIyejNzb2FsYTB2Y3JrMWk1djR2OG": { type: "date", isArray: false, isOptional: false }
			},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.reportDecoupling(
				params["Nyc2xqNmNkOWd0MXx3N3F2MDdoM3RjMm"],
				params["l5cGM0Y3EwOXd6bHp5cGpkM2I4anZ1ZH"],
				params["xoMD12dnh3Nj9waTFkb3dmY3c4aDQ5bX"],
				params["k5ejIyejNzb2FsYTB2Y3JrMWk1djR2OG"]
			)
		);

		this.expose(
			"03eXFoeXkydXhmeHNvcGMyeWZ3d3Vya2",
			{
			"5yN2Y5ajEwZ3J1OGdyeGRqY2RxcWVuZH": { type: "string", isArray: false, isOptional: false },
				"J1aWYyYmo5bGA0bGhhbWgzOGljamRnNW": { type: "number", isArray: false, isOptional: false },
				"g4Mmo3ej50dj9maXM0bjM3Y2R5c2NncG": { type: "string", isArray: false, isOptional: false },
				"VkZXp2anw4dDE1eDFnd2l4YjVpN3ViNW": { type: "date", isArray: false, isOptional: false }
			},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.reportDerailing(
				params["5yN2Y5ajEwZ3J1OGdyeGRqY2RxcWVuZH"],
				params["J1aWYyYmo5bGA0bGhhbWgzOGljamRnNW"],
				params["g4Mmo3ej50dj9maXM0bjM3Y2R5c2NncG"],
				params["VkZXp2anw4dDE1eDFnd2l4YjVpN3ViNW"]
			)
		);

		this.expose(
			"F1NmB5aWdyeWl0cWB4aGU2MjhqazZvcD",
			{
			"h0bWVncHJuNGBiZWU0dn90cnRhN2BvYj": { type: "string", isArray: false, isOptional: false },
				"k5aXtraGNqbnFiMWdqYmlybTNvOGJkej": { type: "number", isArray: false, isOptional: false },
				"JrZWUya2RxYzZ4aGluZXNlNWMwMmFhZG": { type: "string", isArray: false, isOptional: false },
				"dzOGVpc201OTcxaXMxbHYwb2E5OGd2dj": { type: "string", isArray: false, isOptional: false },
				"8yaj92c3dhc2RnbmRicTZwd3hhNXp3ZX": { type: "date", isArray: false, isOptional: false }
			},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.reportCollision(
				params["h0bWVncHJuNGBiZWU0dn90cnRhN2BvYj"],
				params["k5aXtraGNqbnFiMWdqYmlybTNvOGJkej"],
				params["JrZWUya2RxYzZ4aGluZXNlNWMwMmFhZG"],
				params["dzOGVpc201OTcxaXMxbHYwb2E5OGd2dj"],
				params["8yaj92c3dhc2RnbmRicTZwd3hhNXp3ZX"]
			)
		);

		this.expose(
			"djc3lyazI3ZWJoNXxxd2N1cTQxOHVlcX",
			{
			"IyZnV5bWdzemM2bnQyZms1cmRuanQ2cm": { type: "string", isArray: false, isOptional: false },
				"pkYn80Mn41dWhtY2dhcD1yNmNmOGZ6bT": { type: "number", isArray: false, isOptional: false },
				"JoZmdjcDpqbGh2bHF5aHNyMnN1NHs4dW": { type: "string", isArray: false, isOptional: false },
				"M3dDRiaXdkODZzNnx5eXh2emM3a3Y3a3": { type: "date", isArray: false, isOptional: false }
			},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.reportPowerLoss(
				params["IyZnV5bWdzemM2bnQyZms1cmRuanQ2cm"],
				params["pkYn80Mn41dWhtY2dhcD1yNmNmOGZ6bT"],
				params["JoZmdjcDpqbGh2bHF5aHNyMnN1NHs4dW"],
				params["M3dDRiaXdkODZzNnx5eXh2emM3a3Y3a3"]
			)
		);

		this.expose(
			"FyazExd35hdm92enRyNXo4OGZ3dTU5bj",
			{},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.getDecouplingIncidents(
				
			)
		);

		this.expose(
			"N6cDB0eD5tNTlmeXJraWV0bTowNWBxZG",
			{},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.getDerailingIncidents(
				
			)
		);

		this.expose(
			"hucHdtd2Rta2lyeGR4OHd6NWpqNXEyc2",
			{},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.getCollisionIncidents(
				
			)
		);

		this.expose(
			"Jyb31yMnNpcjYxdGI1bDNjbD1tcjtxZ2",
			{},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.getPowerLossIncidents(
				
			)
		);

		this.expose(
			"k4MWQ1aWc4aWE5ZTFkazMwNn53NnQzNj",
			{},
			inject => inject.construct(LiveService),
			(controller, params) => controller.getCameras(
				
			)
		);

		this.expose(
			"5xMzJuNGJ3ZDdsOT9hOHYxM3oweml1bj",
			{
			"1ubzlvbjFiMGZveDVveWV6cXUya2pzZT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(MaintenanceService),
			(controller, params) => controller.get(
				params["1ubzlvbjFiMGZveDVveWV6cXUya2pzZT"]
			)
		);

		this.expose(
			"Zlcm42OWVwcmQ5en5oZHIwcDl0cmVzZz",
			{
			"NraXFwYWcyamRiaWlhNWgxM3FoZWU0Mj": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(MaintenanceService),
			(controller, params) => controller.open(
				params["NraXFwYWcyamRiaWlhNWgxM3FoZWU0Mj"]
			)
		);

		this.expose(
			"hxbWd2dT42aDZycjs5djB6ZmdraGtlbn",
			{
			"hycjg0cHFmeWN4NWphenF6ejNkOGh2aH": { type: MaintenanceViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MaintenanceService),
			(controller, params) => controller.save(
				params["hycjg0cHFmeWN4NWphenF6ejNkOGh2aH"]
			)
		);

		this.expose(
			"Jyd2V1N2pzZzIzYmRzcDp2Z256a2U4d2",
			{
			"04bDZ0N3lveGp5Y2JvYWI5b2A0cTh6ZX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(MaintenanceService),
			(controller, params) => controller.complete(
				params["04bDZ0N3lveGp5Y2JvYWI5b2A0cTh6ZX"]
			)
		);

		this.expose(
			"cxZGJtaGBzY3t5bntiZmVmdzZ5bDYxbD",
			{
			"1wbmJxdmkzanZsbzV4YWEwa34ydDs2c2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(RailcarModelService),
			(controller, params) => controller.getModel(
				params["1wbmJxdmkzanZsbzV4YWEwa34ydDs2c2"]
			)
		);

		this.expose(
			"RiNGo2MHxtc2RkZXs3ZTB2b3hxc3txbm",
			{},
			inject => inject.construct(RailcarModelService),
			(controller, params) => controller.list(
				
			)
		);

		this.expose(
			"g1c2NhNjNvM3BlODw2NzN3dnJpcmdtMW",
			{
			"Y2aWNtZjIxNHxlcj1jYTk1Y39iM2VpM2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(RailcarModelService),
			(controller, params) => controller.getRailcars(
				params["Y2aWNtZjIxNHxlcj1jYTk1Y39iM2VpM2"]
			)
		);

		this.expose(
			"pnZW16NWRreHdmb2hpdWl5YWdodzM4NW",
			{},
			inject => inject.construct(RailcarModelService),
			(controller, params) => controller.getUicClasses(
				
			)
		);

		this.expose(
			"dlb3JtcmNyYTJzeGAyMGJhemR2NGo5cD",
			{
			"NhdXE0dzR5dTJ0Z21xZDg0djQ5OGJieH": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(RailcarModelService),
			(controller, params) => controller.getUicIndexLetters(
				params["NhdXE0dzR5dTJ0Z21xZDg0djQ5OGJieH"]
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
			"V5OHNoNWZxb2J0bTVhcGxtdWI5aTt4OT",
			{
			"dsaTJpcm9nOWhkazEycGZxcGJzcGZ2bW": { type: "string", isArray: false, isOptional: false },
				"h0bHNxc2tvbWN1ZnE4bj1vYj4xNWV6Zm": { type: "string", isArray: false, isOptional: false },
				"ltdzpmYWoyaWxhOX9lbG0yNDJsODhran": { type: "string", isArray: false, isOptional: false },
				"FnYzhvNTJxMGIzYnRmampmMWQwOWhmZD": { type: "date", isArray: false, isOptional: false },
				"llM2AycmI2eGVzeTpsZWVhaGF2M3Vmbm": { type: "number", isArray: false, isOptional: false },
				"RqcmlwaGl3bmZrYjI0M2ZqcDV6ZXZiem": { type: "string", isArray: false, isOptional: false },
				"RhbH9yZmhsMWh5dm1mcTU4emB4amlveD": { type: "string", isArray: false, isOptional: false },
				"1pc3ZudXVic3V2dDhka2R2MzA0enNpM2": { type: "string", isArray: false, isOptional: false },
				"NibXhucHYxaWBwc3NsNmZpdHk0ZnUzOT": { type: "string", isArray: false, isOptional: false },
				"dodmAwZzVyMmBkanZsOXdtNnZ2d3hnZn": { type: "string", isArray: false, isOptional: false },
				"ZjaXR2MDU5ZjU3ZmluY29wczVhcjRreX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(RailcarService),
			(controller, params) => controller.register(
				params["dsaTJpcm9nOWhkazEycGZxcGJzcGZ2bW"],
				params["h0bHNxc2tvbWN1ZnE4bj1vYj4xNWV6Zm"],
				params["ltdzpmYWoyaWxhOX9lbG0yNDJsODhran"],
				params["FnYzhvNTJxMGIzYnRmampmMWQwOWhmZD"],
				params["llM2AycmI2eGVzeTpsZWVhaGF2M3Vmbm"],
				params["RqcmlwaGl3bmZrYjI0M2ZqcDV6ZXZiem"],
				params["RhbH9yZmhsMWh5dm1mcTU4emB4amlveD"],
				params["1pc3ZudXVic3V2dDhka2R2MzA0enNpM2"],
				params["NibXhucHYxaWBwc3NsNmZpdHk0ZnUzOT"],
				params["dodmAwZzVyMmBkanZsOXdtNnZ2d3hnZn"],
				params["ZjaXR2MDU5ZjU3ZmluY29wczVhcjRreX"]
			)
		);

		this.expose(
			"t4M2k4bGNuY2RmNHRodHA4cDphOHVjNz",
			{},
			inject => inject.construct(RailcarService),
			(controller, params) => controller.getCouplerTypes(
				
			)
		);

		this.expose(
			"M4a3A2amg4emIxeD5jNjFycTRmYXQxcD",
			{
			"JieHJpcHhvaTJ6bHMzMHJtY3F1bnl4MT": { type: "string", isArray: false, isOptional: false },
				"x0MWg5aTlsZ2hlNDFsdzJicGBsdnp1Nm": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(RailcarService),
			(controller, params) => controller.setAnchor(
				params["JieHJpcHhvaTJ6bHMzMHJtY3F1bnl4MT"],
				params["x0MWg5aTlsZ2hlNDFsdzJicGBsdnp1Nm"]
			)
		);

		this.expose(
			"xyOWBjaG92dX42YWAzYWE0bzt6Ynw0aD",
			{
			"04eGxqNmljejBza2FhaWkwdHxsOHdnen": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(RailcarService),
			(controller, params) => controller.withdraw(
				params["04eGxqNmljejBza2FhaWkwdHxsOHdnen"]
			)
		);

		this.expose(
			"oxYjU3enQ1Yzl2NzRubWhuNHttbH9qY3",
			{
			"95Yjp2N39naXg2cWg0MjY0MnkwZGh4ZG": { type: "string", isArray: false, isOptional: false },
				"ZuM2wyMm5sazlraDFvdnJ3dTdxdWRhZm": { type: "string", isArray: false, isOptional: false },
				"RzODgwZ3JkZ3VlNn5zM2A1cGB2MXVudD": { type: "number", isArray: false, isOptional: false },
				"14eDF4bztvbGI5anwwdmBmMzVtOGl1eW": { type: "boolean", isArray: false, isOptional: false }
			},
			inject => inject.construct(RailcarService),
			(controller, params) => controller.comission(
				params["95Yjp2N39naXg2cWg0MjY0MnkwZGh4ZG"],
				params["ZuM2wyMm5sazlraDFvdnJ3dTdxdWRhZm"],
				params["RzODgwZ3JkZ3VlNn5zM2A1cGB2MXVudD"],
				params["14eDF4bztvbGI5anwwdmBmMzVtOGl1eW"]
			)
		);

		this.expose(
			"81ZWxic3hxN2hvb2BmN3d6MX41ZTFrMH",
			{
			"hkc2Zmd3hydHN6cHV1b3NxY3A1d2Fic2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(SearchService),
			(controller, params) => controller.search(
				params["hkc2Zmd3hydHN6cHV1b3NxY3A1d2Fic2"]
			)
		);

		this.expose(
			"NhbXltY3IxcnBmNWM2eDpoZ2Joc3FpaX",
			{},
			inject => inject.construct(SessionService),
			(controller, params) => controller.getSession(
				
			)
		);

		this.expose(
			"p5bTdkd2J2OGNnaXxicmt5amdpZXExcW",
			{
			"R4a2VuMGZ0MmlnNmkyZGdxZDFwMWBjbz": { type: "string", isArray: false, isOptional: false },
				"JoOGpqNGkyMTV6OTVxeWZpZDI2NnA3MG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(SessionService),
			(controller, params) => controller.login(
				params["R4a2VuMGZ0MmlnNmkyZGdxZDFwMWBjbz"],
				params["JoOGpqNGkyMTV6OTVxeWZpZDI2NnA3MG"]
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
		);

		this.expose(
			"dpZGNpcXprMWV5aDVpb3BsaDU1Z2FreW",
			{
			"RmYjhpMnhrcXRhY2E4M2M1YjVpcGF2aG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.uncoupleAfter(
				params["RmYjhpMnhrcXRhY2E4M2M1YjVpcGF2aG"]
			)
		);

		this.expose(
			"p1ZGExaDh2ZzlibTUxamFteTVwcDZtMz",
			{
			"ZxMGU5Mnlpd2BlZzo4eXFycXJ1OWpjcD": { type: "string", isArray: false, isOptional: false },
				"IzZ2lqNmZ3eWZqaXhnMnlwczVwNGg3OW": { type: "string", isArray: false, isOptional: false },
				"ZmMzUydGRjZXVxbXd0Z2F6dHF3cTI4Mz": { type: "string", isArray: false, isOptional: false },
				"hwcDV2bTo5aWZlaDlxNTU2ZmVhMjEyZT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.couple(
				params["ZxMGU5Mnlpd2BlZzo4eXFycXJ1OWpjcD"],
				params["IzZ2lqNmZ3eWZqaXhnMnlwczVwNGg3OW"],
				params["ZmMzUydGRjZXVxbXd0Z2F6dHF3cTI4Mz"],
				params["hwcDV2bTo5aWZlaDlxNTU2ZmVhMjEyZT"]
			)
		);

		this.expose(
			"FpZXZtYWR5eGRiZzlqMDhyYXRra3M5b2",
			{},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getTrains(
				
			)
		);

		this.expose(
			"V2a2BkdWdoeWlkeWF1bndueDZkengwbX",
			{
			"IzOXl5ajMwdjFzdXxmcWNlanhwbDhtdz": { type: "string", isArray: false, isOptional: false },
				"xoN2VxMmEyamQ2cHc3cGZzNnVjdD45bT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getCoupleableTrains(
				params["IzOXl5ajMwdjFzdXxmcWNlanhwbDhtdz"],
				params["xoN2VxMmEyamQ2cHc3cGZzNnVjdD45bT"]
			)
		);

		this.expose(
			"Y4ZWFhZHZjOWFqdmlpNnBvdHNzZn56dW",
			{
			"A4MGIyc2MyazNpcm91MjZ1ZjM3bmRmN3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getTrain(
				params["A4MGIyc2MyazNpcm91MjZ1ZjM3bmRmN3"]
			)
		);

		this.expose(
			"M5a2Nzdz5oMHl2eDM1dWVjM3dnaWprcW",
			{
			"t2ZXNzdnU2bTRlZHl5OTJjZ3ZhcTAzeW": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getTrainRailcars(
				params["t2ZXNzdnU2bTRlZHl5OTJjZ3ZhcTAzeW"]
			)
		);

		this.expose(
			"hvc3V6ZXVydDV3Z2dvMGsxMXZ5NjFqbm",
			{
			"h6bmlpbjRhMDh4d2YxcDppaDtlc3MwZG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getRailcarTrain(
				params["h6bmlpbjRhMDh4d2YxcDppaDtlc3MwZG"]
			)
		);

		this.expose(
			"J6eDNvcXZncDFrbDh1Zn54Nzs2cHdjMW",
			{},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getLastTrainPositions(
				
			)
		);

		this.expose(
			"RiNWJ3Zzd1Z35ncnh6d2lzY39laDtjZ2",
			{},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getProductBrands(
				
			)
		);

		this.expose(
			"VzeGo0azRsYWE1M2Nybm9tN2hiZ3Rlbj",
			{},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getActiveLabels(
				
			)
		);

		this.expose(
			"M0MHVoOWR1Z2VoYnVpdj8wZXJ3dTFpd3",
			{
			"03ZGMyNWF5eXE5MGoxOHFidT5taGo1MG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getLabel(
				params["03ZGMyNWF5eXE5MGoxOHFidT5taGo1MG"]
			)
		);

		this.expose(
			"FtZjlpcWBtYXQ0ZzI0emlkdnAxcWZ0cX",
			{
			"14MnFtejM2NGhrOWRiczVsYnluaGJjYX": { type: "string", isArray: false, isOptional: false },
				"lkMXRlZ2Q5a2FubHUyOXFpcHtoZWE5bj": { type: "string", isArray: false, isOptional: false },
				"JtMGJ6N38zNXVxYjJoNWF0aHR2N316Ym": { type: "string", isArray: false, isOptional: false },
				"xnZXp4M2QwamQ5dnFqdGU3djU4d2YycD": { type: "string", isArray: false, isOptional: false },
				"5nZGRudzU1cnAzMHl5aHtwdGVqYmk2aG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.assignLabel(
				params["14MnFtejM2NGhrOWRiczVsYnluaGJjYX"],
				params["lkMXRlZ2Q5a2FubHUyOXFpcHtoZWE5bj"],
				params["JtMGJ6N38zNXVxYjJoNWF0aHR2N316Ym"],
				params["xnZXp4M2QwamQ5dnFqdGU3djU4d2YycD"],
				params["5nZGRudzU1cnAzMHl5aHtwdGVqYmk2aG"]
			)
		)
	}
}

ViewModel.mappings = {
	[CaptureViewModel.name]: class ComposedCaptureViewModel extends CaptureViewModel {
		async map() {
			return {
				bufferAnchorOffset: this.$$model.bufferAnchorOffset,
				captured: this.$$model.captured,
				corrupted: this.$$model.corrupted,
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
				bufferAnchorOffset: true,
				captured: true,
				corrupted: true,
				direction: true,
				id: true
			};
		};

		static toViewModel(data) {
			const item = new CaptureViewModel(null);
			"bufferAnchorOffset" in data && (item.bufferAnchorOffset = data.bufferAnchorOffset === null ? null : +data.bufferAnchorOffset);
			"captured" in data && (item.captured = data.captured === null ? null : new Date(data.captured));
			"corrupted" in data && (item.corrupted = !!data.corrupted);
			"direction" in data && (item.direction = data.direction && (data.direction instanceof ViewModel ? data.direction : ViewModel.mappings[RailcarDirection.name].toViewModel(data.direction)));
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

			"bufferAnchorOffset" in viewModel && (model.bufferAnchorOffset = viewModel.bufferAnchorOffset === null ? null : +viewModel.bufferAnchorOffset);
			"captured" in viewModel && (model.captured = viewModel.captured === null ? null : new Date(viewModel.captured));
			"corrupted" in viewModel && (model.corrupted = !!viewModel.corrupted);
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
				logoId: this.$$model.logoId,
				name: this.$$model.name,
				shortname: this.$$model.shortname,
				tag: this.$$model.tag,
				trainPrefix: this.$$model.trainPrefix
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
				logoId: true,
				name: true,
				shortname: true,
				tag: true,
				trainPrefix: true
			};
		};

		static toViewModel(data) {
			const item = new CompanySummaryModel(null);
			"iconId" in data && (item.iconId = data.iconId === null ? null : `${data.iconId}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"logoId" in data && (item.logoId = data.logoId === null ? null : `${data.logoId}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);
			"trainPrefix" in data && (item.trainPrefix = data.trainPrefix === null ? null : `${data.trainPrefix}`);

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
			"logoId" in viewModel && (model.logoId = viewModel.logoId === null ? null : `${viewModel.logoId}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortname" in viewModel && (model.shortname = viewModel.shortname === null ? null : `${viewModel.shortname}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);
			"trainPrefix" in viewModel && (model.trainPrefix = viewModel.trainPrefix === null ? null : `${viewModel.trainPrefix}`);

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
				painter: new ArtistSummaryModel(await BaseServer.unwrap(this.$$model.painter)),
				type: new GraffitiTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
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
						[...parents, "artist-GraffitiSummaryModel"]
					);
				},
				get captures() {
					return ViewModel.mappings[GraffitiCaptureViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "captures-GraffitiSummaryModel"]
					);
				},
				get painter() {
					return ViewModel.mappings[ArtistSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "painter-GraffitiSummaryModel"]
					);
				},
				get type() {
					return ViewModel.mappings[GraffitiTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-GraffitiSummaryModel"]
					);
				},
				direction: true,
				id: true,
				name: true,
				painted: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiSummaryModel(null);
			"artist" in data && (item.artist = data.artist && ViewModel.mappings[ArtistSummaryModel.name].toViewModel(data.artist));
			"captures" in data && (item.captures = data.captures && [...data.captures].map(i => ViewModel.mappings[GraffitiCaptureViewModel.name].toViewModel(i)));
			"painter" in data && (item.painter = data.painter && ViewModel.mappings[ArtistSummaryModel.name].toViewModel(data.painter));
			"type" in data && (item.type = data.type && ViewModel.mappings[GraffitiTypeViewModel.name].toViewModel(data.type));
			"direction" in data && (item.direction = data.direction && (data.direction instanceof ViewModel ? data.direction : ViewModel.mappings[RailcarDirection.name].toViewModel(data.direction)));
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
			"painter" in viewModel && (model.painter.id = viewModel.painter ? viewModel.painter.id : null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"direction" in viewModel && (model.direction = viewModel.direction === null ? null : viewModel.direction);
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
	[GraffitiInspirationSummaryModel.name]: class ComposedGraffitiInspirationSummaryModel extends GraffitiInspirationSummaryModel {
		async map() {
			return {
				media: (await this.$$model.media.includeTree(ViewModel.mappings[GraffitiInspirationMediaViewModel.name].items).toArray()).map(item => new GraffitiInspirationMediaViewModel(item)),
				paintings: (await this.$$model.paintings.includeTree(ViewModel.mappings[GraffitiSummaryModel.name].items).toArray()).map(item => new GraffitiSummaryModel(item)),
				captured: this.$$model.captured,
				id: this.$$model.id,
				name: this.$$model.name,
				origin: this.$$model.origin,
				paintingUrge: this.$$model.paintingUrge
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
				get media() {
					return ViewModel.mappings[GraffitiInspirationMediaViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "media-GraffitiInspirationSummaryModel"]
					);
				},
				get paintings() {
					return ViewModel.mappings[GraffitiSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "paintings-GraffitiInspirationSummaryModel"]
					);
				},
				captured: true,
				id: true,
				name: true,
				origin: true,
				paintingUrge: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiInspirationSummaryModel(null);
			"media" in data && (item.media = data.media && [...data.media].map(i => ViewModel.mappings[GraffitiInspirationMediaViewModel.name].toViewModel(i)));
			"paintings" in data && (item.paintings = data.paintings && [...data.paintings].map(i => ViewModel.mappings[GraffitiSummaryModel.name].toViewModel(i)));
			"captured" in data && (item.captured = data.captured === null ? null : new Date(data.captured));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"origin" in data && (item.origin = data.origin === null ? null : `${data.origin}`);
			"paintingUrge" in data && (item.paintingUrge = data.paintingUrge === null ? null : +data.paintingUrge);

			return item;
		}

		static async toModel(viewModel: GraffitiInspirationSummaryModel) {
			let model: GraffitiInspiration;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(GraffitiInspiration).find(viewModel.id)
			} else {
				model = new GraffitiInspiration();
			}

			"media" in viewModel && (null);
			"paintings" in viewModel && (null);
			"captured" in viewModel && (model.captured = viewModel.captured === null ? null : new Date(viewModel.captured));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"origin" in viewModel && (model.origin = viewModel.origin === null ? null : `${viewModel.origin}`);
			"paintingUrge" in viewModel && (model.paintingUrge = viewModel.paintingUrge === null ? null : +viewModel.paintingUrge);

			return model;
		}
	},
	[GraffitiInspirationMediaViewModel.name]: class ComposedGraffitiInspirationMediaViewModel extends GraffitiInspirationMediaViewModel {
		async map() {
			return {
				id: this.$$model.id,
				mimeType: this.$$model.mimeType
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
				mimeType: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiInspirationMediaViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"mimeType" in data && (item.mimeType = data.mimeType === null ? null : `${data.mimeType}`);

			return item;
		}

		static async toModel(viewModel: GraffitiInspirationMediaViewModel) {
			let model: GraffitiInspirationMedia;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(GraffitiInspirationMedia).find(viewModel.id)
			} else {
				model = new GraffitiInspirationMedia();
			}

			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"mimeType" in viewModel && (model.mimeType = viewModel.mimeType === null ? null : `${viewModel.mimeType}`);

			return model;
		}
	},
	[CollisionIncidentViewModel.name]: class ComposedCollisionIncidentViewModel extends CollisionIncidentViewModel {
		async map() {
			return {
				failed: this.$$model.failed,
				id: this.$$model.id,
				position: this.$$model.position,
				section: this.$$model.section
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
				failed: true,
				id: true,
				position: true,
				section: true
			};
		};

		static toViewModel(data) {
			const item = new CollisionIncidentViewModel(null);
			"failed" in data && (item.failed = data.failed === null ? null : new Date(data.failed));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"position" in data && (item.position = data.position === null ? null : +data.position);
			"section" in data && (item.section = data.section === null ? null : `${data.section}`);

			return item;
		}

		static async toModel(viewModel: CollisionIncidentViewModel) {
			let model: CollisionIncident;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(CollisionIncident).find(viewModel.id)
			} else {
				model = new CollisionIncident();
			}

			"failed" in viewModel && (model.failed = viewModel.failed === null ? null : new Date(viewModel.failed));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"position" in viewModel && (model.position = viewModel.position === null ? null : +viewModel.position);
			"section" in viewModel && (model.section = viewModel.section === null ? null : `${viewModel.section}`);

			return model;
		}
	},
	[DecouplingIncidentViewModel.name]: class ComposedDecouplingIncidentViewModel extends DecouplingIncidentViewModel {
		async map() {
			return {
				failed: this.$$model.failed,
				id: this.$$model.id,
				position: this.$$model.position,
				section: this.$$model.section
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
				failed: true,
				id: true,
				position: true,
				section: true
			};
		};

		static toViewModel(data) {
			const item = new DecouplingIncidentViewModel(null);
			"failed" in data && (item.failed = data.failed === null ? null : new Date(data.failed));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"position" in data && (item.position = data.position === null ? null : +data.position);
			"section" in data && (item.section = data.section === null ? null : `${data.section}`);

			return item;
		}

		static async toModel(viewModel: DecouplingIncidentViewModel) {
			let model: DecouplingIncident;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(DecouplingIncident).find(viewModel.id)
			} else {
				model = new DecouplingIncident();
			}

			"failed" in viewModel && (model.failed = viewModel.failed === null ? null : new Date(viewModel.failed));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"position" in viewModel && (model.position = viewModel.position === null ? null : +viewModel.position);
			"section" in viewModel && (model.section = viewModel.section === null ? null : `${viewModel.section}`);

			return model;
		}
	},
	[DerailingIncidentViewModel.name]: class ComposedDerailingIncidentViewModel extends DerailingIncidentViewModel {
		async map() {
			return {
				failed: this.$$model.failed,
				id: this.$$model.id,
				position: this.$$model.position,
				section: this.$$model.section
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
				failed: true,
				id: true,
				position: true,
				section: true
			};
		};

		static toViewModel(data) {
			const item = new DerailingIncidentViewModel(null);
			"failed" in data && (item.failed = data.failed === null ? null : new Date(data.failed));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"position" in data && (item.position = data.position === null ? null : +data.position);
			"section" in data && (item.section = data.section === null ? null : `${data.section}`);

			return item;
		}

		static async toModel(viewModel: DerailingIncidentViewModel) {
			let model: DerailingIncident;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(DerailingIncident).find(viewModel.id)
			} else {
				model = new DerailingIncident();
			}

			"failed" in viewModel && (model.failed = viewModel.failed === null ? null : new Date(viewModel.failed));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"position" in viewModel && (model.position = viewModel.position === null ? null : +viewModel.position);
			"section" in viewModel && (model.section = viewModel.section === null ? null : `${viewModel.section}`);

			return model;
		}
	},
	[PowerLossIncidentViewModel.name]: class ComposedPowerLossIncidentViewModel extends PowerLossIncidentViewModel {
		async map() {
			return {
				failed: this.$$model.failed,
				id: this.$$model.id,
				position: this.$$model.position,
				section: this.$$model.section
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
				failed: true,
				id: true,
				position: true,
				section: true
			};
		};

		static toViewModel(data) {
			const item = new PowerLossIncidentViewModel(null);
			"failed" in data && (item.failed = data.failed === null ? null : new Date(data.failed));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"position" in data && (item.position = data.position === null ? null : +data.position);
			"section" in data && (item.section = data.section === null ? null : `${data.section}`);

			return item;
		}

		static async toModel(viewModel: PowerLossIncidentViewModel) {
			let model: PowerLossIncident;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(PowerLossIncident).find(viewModel.id)
			} else {
				model = new PowerLossIncident();
			}

			"failed" in viewModel && (model.failed = viewModel.failed === null ? null : new Date(viewModel.failed));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"position" in viewModel && (model.position = viewModel.position === null ? null : +viewModel.position);
			"section" in viewModel && (model.section = viewModel.section === null ? null : `${viewModel.section}`);

			return model;
		}
	},
	[CameraViewModel.name]: class ComposedCameraViewModel extends CameraViewModel {
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
			const item = new CameraViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: CameraViewModel) {
			let model: Camera;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Camera).find(viewModel.id)
			} else {
				model = new Camera();
			}

			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[MaintenanceSummaryModel.name]: class ComposedMaintenanceSummaryModel extends MaintenanceSummaryModel {
		async map() {
			return {
				completed: this.$$model.completed,
				id: this.$$model.id,
				opened: this.$$model.opened,
				title: this.$$model.title
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
				completed: true,
				id: true,
				opened: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new MaintenanceSummaryModel(null);
			"completed" in data && (item.completed = data.completed === null ? null : new Date(data.completed));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"opened" in data && (item.opened = data.opened === null ? null : new Date(data.opened));
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: MaintenanceSummaryModel) {
			let model: Maintenance;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Maintenance).find(viewModel.id)
			} else {
				model = new Maintenance();
			}

			"completed" in viewModel && (model.completed = viewModel.completed === null ? null : new Date(viewModel.completed));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"opened" in viewModel && (model.opened = viewModel.opened === null ? null : new Date(viewModel.opened));
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[CargoSlotViewModel.name]: class ComposedCargoSlotViewModel extends CargoSlotViewModel {
		async map() {
			return {
				fixture: new CargoFixtureViewModel(await BaseServer.unwrap(this.$$model.fixture)),
				baseline: this.$$model.baseline,
				clearanceHead: this.$$model.clearanceHead,
				clearanceTail: this.$$model.clearanceTail,
				direction: this.$$model.direction,
				id: this.$$model.id,
				offset: this.$$model.offset
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
				get fixture() {
					return ViewModel.mappings[CargoFixtureViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "fixture-CargoSlotViewModel"]
					);
				},
				baseline: true,
				clearanceHead: true,
				clearanceTail: true,
				direction: true,
				id: true,
				offset: true
			};
		};

		static toViewModel(data) {
			const item = new CargoSlotViewModel(null);
			"fixture" in data && (item.fixture = data.fixture && ViewModel.mappings[CargoFixtureViewModel.name].toViewModel(data.fixture));
			"baseline" in data && (item.baseline = data.baseline === null ? null : +data.baseline);
			"clearanceHead" in data && (item.clearanceHead = data.clearanceHead === null ? null : +data.clearanceHead);
			"clearanceTail" in data && (item.clearanceTail = data.clearanceTail === null ? null : +data.clearanceTail);
			"direction" in data && (item.direction = data.direction && (data.direction instanceof ViewModel ? data.direction : ViewModel.mappings[RailcarDirection.name].toViewModel(data.direction)));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"offset" in data && (item.offset = data.offset === null ? null : +data.offset);

			return item;
		}

		static async toModel(viewModel: CargoSlotViewModel) {
			let model: CargoSlot;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(CargoSlot).find(viewModel.id)
			} else {
				model = new CargoSlot();
			}

			"fixture" in viewModel && (model.fixture.id = viewModel.fixture ? viewModel.fixture.id : null);
			"baseline" in viewModel && (model.baseline = viewModel.baseline === null ? null : +viewModel.baseline);
			"clearanceHead" in viewModel && (model.clearanceHead = viewModel.clearanceHead === null ? null : +viewModel.clearanceHead);
			"clearanceTail" in viewModel && (model.clearanceTail = viewModel.clearanceTail === null ? null : +viewModel.clearanceTail);
			"direction" in viewModel && (model.direction = viewModel.direction === null ? null : viewModel.direction);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"offset" in viewModel && (model.offset = viewModel.offset === null ? null : +viewModel.offset);

			return model;
		}
	},
	[CargoFixtureViewModel.name]: class ComposedCargoFixtureViewModel extends CargoFixtureViewModel {
		async map() {
			return {
				loadTypes: (await this.$$model.loadTypes.includeTree(ViewModel.mappings[CargoLoadTypeViewModel.name].items).toArray()).map(item => new CargoLoadTypeViewModel(item)),
				id: this.$$model.id,
				length: this.$$model.length,
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
				get loadTypes() {
					return ViewModel.mappings[CargoLoadTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "loadTypes-CargoFixtureViewModel"]
					);
				},
				id: true,
				length: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new CargoFixtureViewModel(null);
			"loadTypes" in data && (item.loadTypes = data.loadTypes && [...data.loadTypes].map(i => ViewModel.mappings[CargoLoadTypeViewModel.name].toViewModel(i)));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"length" in data && (item.length = data.length === null ? null : +data.length);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: CargoFixtureViewModel) {
			let model: CargoFixture;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(CargoFixture).find(viewModel.id)
			} else {
				model = new CargoFixture();
			}

			"loadTypes" in viewModel && (null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"length" in viewModel && (model.length = viewModel.length === null ? null : +viewModel.length);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[CargoLoadTypeViewModel.name]: class ComposedCargoLoadTypeViewModel extends CargoLoadTypeViewModel {
		async map() {
			return {
				height: this.$$model.height,
				id: this.$$model.id,
				name: this.$$model.name,
				oversizeHead: this.$$model.oversizeHead,
				oversizeTail: this.$$model.oversizeTail
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
				name: true,
				oversizeHead: true,
				oversizeTail: true
			};
		};

		static toViewModel(data) {
			const item = new CargoLoadTypeViewModel(null);
			"height" in data && (item.height = data.height === null ? null : +data.height);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"oversizeHead" in data && (item.oversizeHead = data.oversizeHead === null ? null : +data.oversizeHead);
			"oversizeTail" in data && (item.oversizeTail = data.oversizeTail === null ? null : +data.oversizeTail);

			return item;
		}

		static async toModel(viewModel: CargoLoadTypeViewModel) {
			let model: CargoLoadType;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(CargoLoadType).find(viewModel.id)
			} else {
				model = new CargoLoadType();
			}

			"height" in viewModel && (model.height = viewModel.height === null ? null : +viewModel.height);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"oversizeHead" in viewModel && (model.oversizeHead = viewModel.oversizeHead === null ? null : +viewModel.oversizeHead);
			"oversizeTail" in viewModel && (model.oversizeTail = viewModel.oversizeTail === null ? null : +viewModel.oversizeTail);

			return model;
		}
	},
	[UicIdentifierClassViewModel.name]: class ComposedUicIdentifierClassViewModel extends UicIdentifierClassViewModel {
		async map() {
			return {
				code: this.$$model.code,
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
				code: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new UicIdentifierClassViewModel(null);
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: UicIdentifierClassViewModel) {
			const model = new UicIdentifierClass();

			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[UicIdentifierIndexLetterViewModel.name]: class ComposedUicIdentifierIndexLetterViewModel extends UicIdentifierIndexLetterViewModel {
		async map() {
			return {
				classFilter: this.$$model.classFilter,
				code: this.$$model.code,
				name: this.$$model.name,
				uicLocaleId: this.$$model.uicLocaleId
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
				classFilter: true,
				code: true,
				name: true,
				uicLocaleId: true
			};
		};

		static toViewModel(data) {
			const item = new UicIdentifierIndexLetterViewModel(null);
			"classFilter" in data && (item.classFilter = data.classFilter === null ? null : `${data.classFilter}`);
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"uicLocaleId" in data && (item.uicLocaleId = data.uicLocaleId === null ? null : `${data.uicLocaleId}`);

			return item;
		}

		static async toModel(viewModel: UicIdentifierIndexLetterViewModel) {
			const model = new UicIdentifierIndexLetter();

			"classFilter" in viewModel && (model.classFilter = viewModel.classFilter === null ? null : `${viewModel.classFilter}`);
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"uicLocaleId" in viewModel && (model.uicLocaleId = viewModel.uicLocaleId === null ? null : `${viewModel.uicLocaleId}`);

			return model;
		}
	},
	[UicLocaleViewModel.name]: class ComposedUicLocaleViewModel extends UicLocaleViewModel {
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
			const item = new UicLocaleViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: UicLocaleViewModel) {
			let model: UicLocale;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(UicLocale).find(viewModel.id)
			} else {
				model = new UicLocale();
			}

			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[RailcarCargoLoadViewModel.name]: class ComposedRailcarCargoLoadViewModel extends RailcarCargoLoadViewModel {
		async map() {
			return {
				owner: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.owner)),
				slot: new CargoSlotViewModel(await BaseServer.unwrap(this.$$model.slot)),
				type: new CargoLoadTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
				color: this.$$model.color,
				id: this.$$model.id,
				identifier: this.$$model.identifier,
				logoColor: this.$$model.logoColor,
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
				get owner() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "owner-RailcarCargoLoadViewModel"]
					);
				},
				get slot() {
					return ViewModel.mappings[CargoSlotViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "slot-RailcarCargoLoadViewModel"]
					);
				},
				get type() {
					return ViewModel.mappings[CargoLoadTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-RailcarCargoLoadViewModel"]
					);
				},
				color: true,
				id: true,
				identifier: true,
				logoColor: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarCargoLoadViewModel(null);
			"owner" in data && (item.owner = data.owner && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.owner));
			"slot" in data && (item.slot = data.slot && ViewModel.mappings[CargoSlotViewModel.name].toViewModel(data.slot));
			"type" in data && (item.type = data.type && ViewModel.mappings[CargoLoadTypeViewModel.name].toViewModel(data.type));
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"identifier" in data && (item.identifier = data.identifier === null ? null : `${data.identifier}`);
			"logoColor" in data && (item.logoColor = data.logoColor === null ? null : `${data.logoColor}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: RailcarCargoLoadViewModel) {
			let model: CargoLoad;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(CargoLoad).find(viewModel.id)
			} else {
				model = new CargoLoad();
			}

			"owner" in viewModel && (model.owner.id = viewModel.owner ? viewModel.owner.id : null);
			"slot" in viewModel && (model.slot.id = viewModel.slot ? viewModel.slot.id : null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"identifier" in viewModel && (model.identifier = viewModel.identifier === null ? null : `${viewModel.identifier}`);
			"logoColor" in viewModel && (model.logoColor = viewModel.logoColor === null ? null : `${viewModel.logoColor}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[CouplerViewModel.name]: class ComposedCouplerViewModel extends CouplerViewModel {
		async map() {
			return {
				type: new CouplerTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
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
				get type() {
					return ViewModel.mappings[CouplerTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-CouplerViewModel"]
					);
				},
				id: true
			};
		};

		static toViewModel(data) {
			const item = new CouplerViewModel(null);
			"type" in data && (item.type = data.type && ViewModel.mappings[CouplerTypeViewModel.name].toViewModel(data.type));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: CouplerViewModel) {
			let model: Coupler;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Coupler).find(viewModel.id)
			} else {
				model = new Coupler();
			}

			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[CouplerTypeSummaryModel.name]: class ComposedCouplerTypeSummaryModel extends CouplerTypeSummaryModel {
		async map() {
			return {
				flippable: this.$$model.flippable,
				icon: this.$$model.icon,
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
				flippable: true,
				icon: true,
				id: true
			};
		};

		static toViewModel(data) {
			const item = new CouplerTypeSummaryModel(null);
			"flippable" in data && (item.flippable = !!data.flippable);
			"icon" in data && (item.icon = data.icon === null ? null : `${data.icon}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: CouplerTypeSummaryModel) {
			let model: CouplerType;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(CouplerType).find(viewModel.id)
			} else {
				model = new CouplerType();
			}

			"flippable" in viewModel && (model.flippable = !!viewModel.flippable);
			"icon" in viewModel && (model.icon = viewModel.icon === null ? null : `${viewModel.icon}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[RailcarModelSummaryModel.name]: class ComposedRailcarModelSummaryModel extends RailcarModelSummaryModel {
		async map() {
			return {
				id: this.$$model.id,
				lengthIncludingCouplers: this.$$model.lengthIncludingCouplers,
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
				lengthIncludingCouplers: true,
				name: true,
				shortname: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarModelSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"lengthIncludingCouplers" in data && (item.lengthIncludingCouplers = data.lengthIncludingCouplers === null ? null : +data.lengthIncludingCouplers);
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
			"lengthIncludingCouplers" in viewModel && (model.lengthIncludingCouplers = viewModel.lengthIncludingCouplers === null ? null : +viewModel.lengthIncludingCouplers);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortname" in viewModel && (model.shortname = viewModel.shortname === null ? null : `${viewModel.shortname}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[RailcarModelDrawingSummaryModel.name]: class ComposedRailcarModelDrawingSummaryModel extends RailcarModelDrawingSummaryModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name,
				source: this.$$model.source
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
				source: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarModelDrawingSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"source" in data && (item.source = data.source === null ? null : `${data.source}`);

			return item;
		}

		static async toModel(viewModel: RailcarModelDrawingSummaryModel) {
			let model: RailcarModelDrawing;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(RailcarModelDrawing).find(viewModel.id)
			} else {
				model = new RailcarModelDrawing();
			}

			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"source" in viewModel && (model.source = viewModel.source === null ? null : `${viewModel.source}`);

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
	[RailcarComissionViewModel.name]: class ComposedRailcarComissionViewModel extends RailcarComissionViewModel {
		async map() {
			return {
				comissioned: this.$$model.comissioned,
				section: this.$$model.section
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
				comissioned: true,
				section: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarComissionViewModel(null);
			"comissioned" in data && (item.comissioned = data.comissioned === null ? null : new Date(data.comissioned));
			"section" in data && (item.section = data.section === null ? null : `${data.section}`);

			return item;
		}

		static async toModel(viewModel: RailcarComissionViewModel) {
			const model = new RailcarComission();

			"comissioned" in viewModel && (model.comissioned = viewModel.comissioned === null ? null : new Date(viewModel.comissioned));
			"section" in viewModel && (model.section = viewModel.section === null ? null : `${viewModel.section}`);

			return model;
		}
	},
	[RailcarWithdrawalViewModel.name]: class ComposedRailcarWithdrawalViewModel extends RailcarWithdrawalViewModel {
		async map() {
			return {
				withdrawn: this.$$model.withdrawn
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
				withdrawn: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarWithdrawalViewModel(null);
			"withdrawn" in data && (item.withdrawn = data.withdrawn === null ? null : new Date(data.withdrawn));

			return item;
		}

		static async toModel(viewModel: RailcarWithdrawalViewModel) {
			const model = new RailcarWithdrawal();

			"withdrawn" in viewModel && (model.withdrawn = viewModel.withdrawn === null ? null : new Date(viewModel.withdrawn));

			return model;
		}
	},
	[SessionViewModel.name]: class ComposedSessionViewModel extends SessionViewModel {
		async map() {
			return {
				account: new AccountViewModel(await BaseServer.unwrap(this.$$model.account)),
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
				get account() {
					return ViewModel.mappings[AccountViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "account-SessionViewModel"]
					);
				},
				id: true
			};
		};

		static toViewModel(data) {
			const item = new SessionViewModel(null);
			"account" in data && (item.account = data.account && ViewModel.mappings[AccountViewModel.name].toViewModel(data.account));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: SessionViewModel) {
			let model: Session;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Session).find(viewModel.id)
			} else {
				model = new Session();
			}

			"account" in viewModel && (model.account.id = viewModel.account ? viewModel.account.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[AccountViewModel.name]: class ComposedAccountViewModel extends AccountViewModel {
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
			const item = new AccountViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: AccountViewModel) {
			let model: Account;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Account).find(viewModel.id)
			} else {
				model = new Account();
			}

			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

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
	[CouplingViewModel.name]: class ComposedCouplingViewModel extends CouplingViewModel {
		async map() {
			return {
				coupled: this.$$model.coupled,
				id: this.$$model.id,
				sourceId: this.$$model.sourceId,
				targetId: this.$$model.targetId
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
				coupled: true,
				id: true,
				sourceId: true,
				targetId: true
			};
		};

		static toViewModel(data) {
			const item = new CouplingViewModel(null);
			"coupled" in data && (item.coupled = data.coupled === null ? null : new Date(data.coupled));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"sourceId" in data && (item.sourceId = data.sourceId === null ? null : `${data.sourceId}`);
			"targetId" in data && (item.targetId = data.targetId === null ? null : `${data.targetId}`);

			return item;
		}

		static async toModel(viewModel: CouplingViewModel) {
			let model: Coupling;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Coupling).find(viewModel.id)
			} else {
				model = new Coupling();
			}

			"coupled" in viewModel && (model.coupled = viewModel.coupled === null ? null : new Date(viewModel.coupled));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"sourceId" in viewModel && (model.sourceId = viewModel.sourceId === null ? null : `${viewModel.sourceId}`);
			"targetId" in viewModel && (model.targetId = viewModel.targetId === null ? null : `${viewModel.targetId}`);

			return model;
		}
	},
	[TrainLabelViewModel.name]: class ComposedTrainLabelViewModel extends TrainLabelViewModel {
		async map() {
			return {
				operator: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.operator)),
				productBrand: new TrainProductBrandSummaryModel(await BaseServer.unwrap(this.$$model.productBrand)),
				description: this.$$model.description,
				id: this.$$model.id,
				label: this.$$model.label,
				trainIdentifier: this.$$model.trainIdentifier
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
				get operator() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "operator-TrainLabelViewModel"]
					);
				},
				get productBrand() {
					return ViewModel.mappings[TrainProductBrandSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "productBrand-TrainLabelViewModel"]
					);
				},
				description: true,
				id: true,
				label: true,
				trainIdentifier: true
			};
		};

		static toViewModel(data) {
			const item = new TrainLabelViewModel(null);
			"operator" in data && (item.operator = data.operator && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.operator));
			"productBrand" in data && (item.productBrand = data.productBrand && ViewModel.mappings[TrainProductBrandSummaryModel.name].toViewModel(data.productBrand));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"label" in data && (item.label = data.label === null ? null : `${data.label}`);
			"trainIdentifier" in data && (item.trainIdentifier = data.trainIdentifier === null ? null : `${data.trainIdentifier}`);

			return item;
		}

		static async toModel(viewModel: TrainLabelViewModel) {
			let model: TrainLabel;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainLabel).find(viewModel.id)
			} else {
				model = new TrainLabel();
			}

			"operator" in viewModel && (model.operator.id = viewModel.operator ? viewModel.operator.id : null);
			"productBrand" in viewModel && (model.productBrand.id = viewModel.productBrand ? viewModel.productBrand.id : null);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"label" in viewModel && (model.label = viewModel.label === null ? null : `${viewModel.label}`);
			"trainIdentifier" in viewModel && (model.trainIdentifier = viewModel.trainIdentifier === null ? null : `${viewModel.trainIdentifier}`);

			return model;
		}
	},
	[TrainHeadPositionViewModel.name]: class ComposedTrainHeadPositionViewModel extends TrainHeadPositionViewModel {
		async map() {
			return {
				id: this.$$model.id,
				offset: this.$$model.offset,
				reversed: this.$$model.reversed,
				section: this.$$model.section,
				trainIdentifier: this.$$model.trainIdentifier,
				updated: this.$$model.updated
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
				offset: true,
				reversed: true,
				section: true,
				trainIdentifier: true,
				updated: true
			};
		};

		static toViewModel(data) {
			const item = new TrainHeadPositionViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"offset" in data && (item.offset = data.offset === null ? null : +data.offset);
			"reversed" in data && (item.reversed = !!data.reversed);
			"section" in data && (item.section = data.section === null ? null : `${data.section}`);
			"trainIdentifier" in data && (item.trainIdentifier = data.trainIdentifier === null ? null : `${data.trainIdentifier}`);
			"updated" in data && (item.updated = data.updated === null ? null : new Date(data.updated));

			return item;
		}

		static async toModel(viewModel: TrainHeadPositionViewModel) {
			let model: TrainHeadPosition;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainHeadPosition).find(viewModel.id)
			} else {
				model = new TrainHeadPosition();
			}

			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"offset" in viewModel && (model.offset = viewModel.offset === null ? null : +viewModel.offset);
			"reversed" in viewModel && (model.reversed = !!viewModel.reversed);
			"section" in viewModel && (model.section = viewModel.section === null ? null : `${viewModel.section}`);
			"trainIdentifier" in viewModel && (model.trainIdentifier = viewModel.trainIdentifier === null ? null : `${viewModel.trainIdentifier}`);
			"updated" in viewModel && (model.updated = viewModel.updated === null ? null : new Date(viewModel.updated));

			return model;
		}
	},
	[LastTrainHeadPositionViewModel.name]: class ComposedLastTrainHeadPositionViewModel extends LastTrainHeadPositionViewModel {
		async map() {
			return {
				trainIdentifier: this.$$model.trainIdentifier,
				section: this.$$model.section,
				offset: this.$$model.offset,
				reversed: this.$$model.reversed,
				coupledLength: this.$$model.coupledLength,
				updated: this.$$model.updated,
				label: this.$$model.label,
				icon: this.$$model.icon
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
				trainIdentifier: true,
				section: true,
				offset: true,
				reversed: true,
				coupledLength: true,
				updated: true,
				label: true,
				icon: true
			};
		};

		static toViewModel(data) {
			const item = new LastTrainHeadPositionViewModel(null);
			"trainIdentifier" in data && (item.trainIdentifier = data.trainIdentifier === null ? null : `${data.trainIdentifier}`);
			"section" in data && (item.section = data.section === null ? null : `${data.section}`);
			"offset" in data && (item.offset = data.offset === null ? null : +data.offset);
			"reversed" in data && (item.reversed = !!data.reversed);
			"coupledLength" in data && (item.coupledLength = data.coupledLength === null ? null : +data.coupledLength);
			"updated" in data && (item.updated = data.updated === null ? null : new Date(data.updated));
			"label" in data && (item.label = data.label === null ? null : `${data.label}`);
			"icon" in data && (item.icon = data.icon === null ? null : `${data.icon}`);

			return item;
		}

		static async toModel(viewModel: LastTrainHeadPositionViewModel) {
			const model = new LastTrainPosition();

			"trainIdentifier" in viewModel && (model.trainIdentifier = viewModel.trainIdentifier === null ? null : `${viewModel.trainIdentifier}`);
			"section" in viewModel && (model.section = viewModel.section === null ? null : `${viewModel.section}`);
			"offset" in viewModel && (model.offset = viewModel.offset === null ? null : +viewModel.offset);
			"reversed" in viewModel && (model.reversed = !!viewModel.reversed);
			"coupledLength" in viewModel && (model.coupledLength = viewModel.coupledLength === null ? null : +viewModel.coupledLength);
			"updated" in viewModel && (model.updated = viewModel.updated === null ? null : new Date(viewModel.updated));
			"label" in viewModel && (model.label = viewModel.label === null ? null : `${viewModel.label}`);
			"icon" in viewModel && (model.icon = viewModel.icon === null ? null : `${viewModel.icon}`);

			return model;
		}
	},
	[TrainProductBrandSummaryModel.name]: class ComposedTrainProductBrandSummaryModel extends TrainProductBrandSummaryModel {
		async map() {
			return {
				icon: this.$$model.icon,
				id: this.$$model.id,
				name: this.$$model.name,
				shortName: this.$$model.shortName
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
				icon: true,
				id: true,
				name: true,
				shortName: true
			};
		};

		static toViewModel(data) {
			const item = new TrainProductBrandSummaryModel(null);
			"icon" in data && (item.icon = data.icon === null ? null : `${data.icon}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortName" in data && (item.shortName = data.shortName === null ? null : `${data.shortName}`);

			return item;
		}

		static async toModel(viewModel: TrainProductBrandSummaryModel) {
			let model: TrainProductBrand;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainProductBrand).find(viewModel.id)
			} else {
				model = new TrainProductBrand();
			}

			"icon" in viewModel && (model.icon = viewModel.icon === null ? null : `${viewModel.icon}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortName" in viewModel && (model.shortName = viewModel.shortName === null ? null : `${viewModel.shortName}`);

			return model;
		}
	},
	[TrainStateViewModel.name]: class ComposedTrainStateViewModel extends TrainStateViewModel {
		async map() {
			return {
				label: this.$$model.label,
				lastHeadPosition: this.$$model.lastHeadPosition
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
				get label() {
					return ViewModel.mappings[TrainLabelViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "label-TrainStateViewModel"]
					);
				},
				get lastHeadPosition() {
					return ViewModel.mappings[TrainHeadPositionViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "lastHeadPosition-TrainStateViewModel"]
					);
				}
			};
		};

		static toViewModel(data) {
			const item = new TrainStateViewModel(null);
			"label" in data && (item.label = data.label && (data.label instanceof ViewModel ? data.label : ViewModel.mappings[TrainLabelViewModel.name].toViewModel(data.label)));
			"lastHeadPosition" in data && (item.lastHeadPosition = data.lastHeadPosition && (data.lastHeadPosition instanceof ViewModel ? data.lastHeadPosition : ViewModel.mappings[TrainHeadPositionViewModel.name].toViewModel(data.lastHeadPosition)));

			return item;
		}

		static async toModel(viewModel: TrainStateViewModel) {
			const model = new TrainState();

			"label" in viewModel && (undefined);
			"lastHeadPosition" in viewModel && (undefined);

			return model;
		}
	},
	[TrainViewModel.name]: class ComposedTrainViewModel extends TrainViewModel {
		async map() {
			return {
				identifier: this.$$model.identifier,
				created: this.$$model.created,
				changed: this.$$model.changed,
				railcarCount: this.$$model.railcarCount,
				coupledLength: this.$$model.coupledLength,
				headCouplerType: this.$$model.headCouplerType,
				tailCouplerType: this.$$model.tailCouplerType,
				section: this.$$model.section,
				offset: this.$$model.offset,
				reversed: this.$$model.reversed,
				label: this.$$model.label
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
				identifier: true,
				created: true,
				changed: true,
				railcarCount: true,
				coupledLength: true,
				headCouplerType: true,
				tailCouplerType: true,
				section: true,
				offset: true,
				reversed: true,
				get label() {
					return ViewModel.mappings[TrainLabelViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "label-TrainViewModel"]
					);
				}
			};
		};

		static toViewModel(data) {
			const item = new TrainViewModel(null);
			"identifier" in data && (item.identifier = data.identifier === null ? null : `${data.identifier}`);
			"created" in data && (item.created = data.created === null ? null : new Date(data.created));
			"changed" in data && (item.changed = data.changed === null ? null : new Date(data.changed));
			"railcarCount" in data && (item.railcarCount = data.railcarCount === null ? null : +data.railcarCount);
			"coupledLength" in data && (item.coupledLength = data.coupledLength === null ? null : +data.coupledLength);
			"headCouplerType" in data && (item.headCouplerType = data.headCouplerType === null ? null : `${data.headCouplerType}`);
			"tailCouplerType" in data && (item.tailCouplerType = data.tailCouplerType === null ? null : `${data.tailCouplerType}`);
			"section" in data && (item.section = data.section === null ? null : `${data.section}`);
			"offset" in data && (item.offset = data.offset === null ? null : +data.offset);
			"reversed" in data && (item.reversed = !!data.reversed);
			"label" in data && (item.label = data.label && (data.label instanceof ViewModel ? data.label : ViewModel.mappings[TrainLabelViewModel.name].toViewModel(data.label)));

			return item;
		}

		static async toModel(viewModel: TrainViewModel) {
			const model = new TrainResponse();

			"identifier" in viewModel && (model.identifier = viewModel.identifier === null ? null : `${viewModel.identifier}`);
			"created" in viewModel && (model.created = viewModel.created === null ? null : new Date(viewModel.created));
			"changed" in viewModel && (model.changed = viewModel.changed === null ? null : new Date(viewModel.changed));
			"railcarCount" in viewModel && (model.railcarCount = viewModel.railcarCount === null ? null : +viewModel.railcarCount);
			"coupledLength" in viewModel && (model.coupledLength = viewModel.coupledLength === null ? null : +viewModel.coupledLength);
			"headCouplerType" in viewModel && (model.headCouplerType = viewModel.headCouplerType === null ? null : `${viewModel.headCouplerType}`);
			"tailCouplerType" in viewModel && (model.tailCouplerType = viewModel.tailCouplerType === null ? null : `${viewModel.tailCouplerType}`);
			"section" in viewModel && (model.section = viewModel.section === null ? null : `${viewModel.section}`);
			"offset" in viewModel && (model.offset = viewModel.offset === null ? null : +viewModel.offset);
			"reversed" in viewModel && (model.reversed = !!viewModel.reversed);
			"label" in viewModel && (undefined);

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
				logoId: this.$$model.logoId,
				name: this.$$model.name,
				shortname: this.$$model.shortname,
				tag: this.$$model.tag,
				trainPrefix: this.$$model.trainPrefix
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
				logoId: true,
				name: true,
				shortname: true,
				tag: true,
				trainPrefix: true
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
			"logoId" in data && (item.logoId = data.logoId === null ? null : `${data.logoId}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);
			"trainPrefix" in data && (item.trainPrefix = data.trainPrefix === null ? null : `${data.trainPrefix}`);

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
			"logoId" in viewModel && (model.logoId = viewModel.logoId === null ? null : `${viewModel.logoId}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortname" in viewModel && (model.shortname = viewModel.shortname === null ? null : `${viewModel.shortname}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);
			"trainPrefix" in viewModel && (model.trainPrefix = viewModel.trainPrefix === null ? null : `${viewModel.trainPrefix}`);

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
				graffitiInspiration: new GraffitiInspirationSummaryModel(await BaseServer.unwrap(this.$$model.graffitiInspiration)),
				painter: new ArtistSummaryModel(await BaseServer.unwrap(this.$$model.painter)),
				railcar: new GraffitiRailcarViewModel(await BaseServer.unwrap(this.$$model.railcar)),
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
				get graffitiInspiration() {
					return ViewModel.mappings[GraffitiInspirationSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "graffitiInspiration-GraffitiViewModel"]
					);
				},
				get painter() {
					return ViewModel.mappings[ArtistSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "painter-GraffitiViewModel"]
					);
				},
				get railcar() {
					return ViewModel.mappings[GraffitiRailcarViewModel.name].getPrefetchingProperties(
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
			"graffitiInspiration" in data && (item.graffitiInspiration = data.graffitiInspiration && ViewModel.mappings[GraffitiInspirationSummaryModel.name].toViewModel(data.graffitiInspiration));
			"painter" in data && (item.painter = data.painter && ViewModel.mappings[ArtistSummaryModel.name].toViewModel(data.painter));
			"railcar" in data && (item.railcar = data.railcar && ViewModel.mappings[GraffitiRailcarViewModel.name].toViewModel(data.railcar));
			"type" in data && (item.type = data.type && ViewModel.mappings[GraffitiTypeViewModel.name].toViewModel(data.type));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"direction" in data && (item.direction = data.direction && (data.direction instanceof ViewModel ? data.direction : ViewModel.mappings[RailcarDirection.name].toViewModel(data.direction)));
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
			"graffitiInspiration" in viewModel && (model.graffitiInspiration.id = viewModel.graffitiInspiration ? viewModel.graffitiInspiration.id : null);
			"painter" in viewModel && (model.painter.id = viewModel.painter ? viewModel.painter.id : null);
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
	[GraffitiInspirationViewModel.name]: class ComposedGraffitiInspirationViewModel extends GraffitiInspirationViewModel {
		async map() {
			return {
				artist: new ArtistSummaryModel(await BaseServer.unwrap(this.$$model.artist)),
				media: (await this.$$model.media.includeTree(ViewModel.mappings[GraffitiInspirationMediaViewModel.name].items).toArray()).map(item => new GraffitiInspirationMediaViewModel(item)),
				paintings: (await this.$$model.paintings.includeTree(ViewModel.mappings[GraffitiSummaryModel.name].items).toArray()).map(item => new GraffitiSummaryModel(item)),
				captured: this.$$model.captured,
				description: this.$$model.description,
				id: this.$$model.id,
				name: this.$$model.name,
				origin: this.$$model.origin,
				paintingEffort: this.$$model.paintingEffort,
				paintingUrge: this.$$model.paintingUrge
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
						[...parents, "artist-GraffitiInspirationViewModel"]
					);
				},
				get media() {
					return ViewModel.mappings[GraffitiInspirationMediaViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "media-GraffitiInspirationViewModel"]
					);
				},
				get paintings() {
					return ViewModel.mappings[GraffitiSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "paintings-GraffitiInspirationViewModel"]
					);
				},
				captured: true,
				description: true,
				id: true,
				name: true,
				origin: true,
				paintingEffort: true,
				paintingUrge: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiInspirationViewModel(null);
			"artist" in data && (item.artist = data.artist && ViewModel.mappings[ArtistSummaryModel.name].toViewModel(data.artist));
			"media" in data && (item.media = data.media && [...data.media].map(i => ViewModel.mappings[GraffitiInspirationMediaViewModel.name].toViewModel(i)));
			"paintings" in data && (item.paintings = data.paintings && [...data.paintings].map(i => ViewModel.mappings[GraffitiSummaryModel.name].toViewModel(i)));
			"captured" in data && (item.captured = data.captured === null ? null : new Date(data.captured));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"origin" in data && (item.origin = data.origin === null ? null : `${data.origin}`);
			"paintingEffort" in data && (item.paintingEffort = data.paintingEffort === null ? null : +data.paintingEffort);
			"paintingUrge" in data && (item.paintingUrge = data.paintingUrge === null ? null : +data.paintingUrge);

			return item;
		}

		static async toModel(viewModel: GraffitiInspirationViewModel) {
			let model: GraffitiInspiration;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(GraffitiInspiration).find(viewModel.id)
			} else {
				model = new GraffitiInspiration();
			}

			"artist" in viewModel && (model.artist.id = viewModel.artist ? viewModel.artist.id : null);
			"media" in viewModel && (null);
			"paintings" in viewModel && (null);
			"captured" in viewModel && (model.captured = viewModel.captured === null ? null : new Date(viewModel.captured));
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"origin" in viewModel && (model.origin = viewModel.origin === null ? null : `${viewModel.origin}`);
			"paintingEffort" in viewModel && (model.paintingEffort = viewModel.paintingEffort === null ? null : +viewModel.paintingEffort);
			"paintingUrge" in viewModel && (model.paintingUrge = viewModel.paintingUrge === null ? null : +viewModel.paintingUrge);

			return model;
		}
	},
	[MaintenanceViewModel.name]: class ComposedMaintenanceViewModel extends MaintenanceViewModel {
		async map() {
			return {
				railcar: new RailcarSummaryModel(await BaseServer.unwrap(this.$$model.railcar)),
				completed: this.$$model.completed,
				cost: this.$$model.cost,
				description: this.$$model.description,
				id: this.$$model.id,
				issue: this.$$model.issue,
				opened: this.$$model.opened,
				title: this.$$model.title
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
				get railcar() {
					return ViewModel.mappings[RailcarSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "railcar-MaintenanceViewModel"]
					);
				},
				completed: true,
				cost: true,
				description: true,
				id: true,
				issue: true,
				opened: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new MaintenanceViewModel(null);
			"railcar" in data && (item.railcar = data.railcar && ViewModel.mappings[RailcarSummaryModel.name].toViewModel(data.railcar));
			"completed" in data && (item.completed = data.completed === null ? null : new Date(data.completed));
			"cost" in data && (item.cost = data.cost === null ? null : +data.cost);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"issue" in data && (item.issue = data.issue === null ? null : `${data.issue}`);
			"opened" in data && (item.opened = data.opened === null ? null : new Date(data.opened));
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: MaintenanceViewModel) {
			let model: Maintenance;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Maintenance).find(viewModel.id)
			} else {
				model = new Maintenance();
			}

			"railcar" in viewModel && (model.railcar.id = viewModel.railcar ? viewModel.railcar.id : null);
			"completed" in viewModel && (model.completed = viewModel.completed === null ? null : new Date(viewModel.completed));
			"cost" in viewModel && (model.cost = viewModel.cost === null ? null : +viewModel.cost);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"issue" in viewModel && (model.issue = viewModel.issue === null ? null : `${viewModel.issue}`);
			"opened" in viewModel && (model.opened = viewModel.opened === null ? null : new Date(viewModel.opened));
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[CouplerTypeViewModel.name]: class ComposedCouplerTypeViewModel extends CouplerTypeViewModel {
		async map() {
			return {
				flippable: this.$$model.flippable,
				icon: this.$$model.icon,
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
				flippable: true,
				icon: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new CouplerTypeViewModel(null);
			"flippable" in data && (item.flippable = !!data.flippable);
			"icon" in data && (item.icon = data.icon === null ? null : `${data.icon}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: CouplerTypeViewModel) {
			let model: CouplerType;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(CouplerType).find(viewModel.id)
			} else {
				model = new CouplerType();
			}

			"flippable" in viewModel && (model.flippable = !!viewModel.flippable);
			"icon" in viewModel && (model.icon = viewModel.icon === null ? null : `${viewModel.icon}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[RailcarModelViewModel.name]: class ComposedRailcarModelViewModel extends RailcarModelViewModel {
		async map() {
			return {
				cargoSlots: (await this.$$model.cargoSlots.includeTree(ViewModel.mappings[CargoSlotViewModel.name].items).toArray()).map(item => new CargoSlotViewModel(item)),
				drawings: (await this.$$model.drawings.includeTree(ViewModel.mappings[RailcarModelSummaryModel.name].items).toArray()).map(item => new RailcarModelSummaryModel(item)),
				uicLocale: new UicLocaleViewModel(await BaseServer.unwrap(this.$$model.uicLocale)),
				id: this.$$model.id,
				lengthIncludingBuffers: this.$$model.lengthIncludingBuffers,
				lengthIncludingCouplers: this.$$model.lengthIncludingCouplers,
				name: this.$$model.name,
				shortname: this.$$model.shortname,
				summary: this.$$model.summary,
				tag: this.$$model.tag,
				uicIdentifier: this.$$model.uicIdentifier
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
				get cargoSlots() {
					return ViewModel.mappings[CargoSlotViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "cargoSlots-RailcarModelViewModel"]
					);
				},
				get drawings() {
					return ViewModel.mappings[RailcarModelSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "drawings-RailcarModelViewModel"]
					);
				},
				get uicLocale() {
					return ViewModel.mappings[UicLocaleViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "uicLocale-RailcarModelViewModel"]
					);
				},
				id: true,
				lengthIncludingBuffers: true,
				lengthIncludingCouplers: true,
				name: true,
				shortname: true,
				summary: true,
				tag: true,
				uicIdentifier: true
			};
		};

		static toViewModel(data) {
			const item = new RailcarModelViewModel(null);
			"cargoSlots" in data && (item.cargoSlots = data.cargoSlots && [...data.cargoSlots].map(i => ViewModel.mappings[CargoSlotViewModel.name].toViewModel(i)));
			"drawings" in data && (item.drawings = data.drawings && [...data.drawings].map(i => ViewModel.mappings[RailcarModelSummaryModel.name].toViewModel(i)));
			"uicLocale" in data && (item.uicLocale = data.uicLocale && ViewModel.mappings[UicLocaleViewModel.name].toViewModel(data.uicLocale));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"lengthIncludingBuffers" in data && (item.lengthIncludingBuffers = data.lengthIncludingBuffers === null ? null : +data.lengthIncludingBuffers);
			"lengthIncludingCouplers" in data && (item.lengthIncludingCouplers = data.lengthIncludingCouplers === null ? null : +data.lengthIncludingCouplers);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortname" in data && (item.shortname = data.shortname === null ? null : `${data.shortname}`);
			"summary" in data && (item.summary = data.summary === null ? null : `${data.summary}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);
			"uicIdentifier" in data && (item.uicIdentifier = data.uicIdentifier === null ? null : `${data.uicIdentifier}`);

			return item;
		}

		static async toModel(viewModel: RailcarModelViewModel) {
			let model: RailcarModel;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(RailcarModel).find(viewModel.id)
			} else {
				model = new RailcarModel();
			}

			"cargoSlots" in viewModel && (null);
			"drawings" in viewModel && (null);
			"uicLocale" in viewModel && (model.uicLocale.id = viewModel.uicLocale ? viewModel.uicLocale.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"lengthIncludingBuffers" in viewModel && (model.lengthIncludingBuffers = viewModel.lengthIncludingBuffers === null ? null : +viewModel.lengthIncludingBuffers);
			"lengthIncludingCouplers" in viewModel && (model.lengthIncludingCouplers = viewModel.lengthIncludingCouplers === null ? null : +viewModel.lengthIncludingCouplers);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortname" in viewModel && (model.shortname = viewModel.shortname === null ? null : `${viewModel.shortname}`);
			"summary" in viewModel && (model.summary = viewModel.summary === null ? null : `${viewModel.summary}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);
			"uicIdentifier" in viewModel && (model.uicIdentifier = viewModel.uicIdentifier === null ? null : `${viewModel.uicIdentifier}`);

			return model;
		}
	},
	[GraffitiRailcarViewModel.name]: class ComposedGraffitiRailcarViewModel extends GraffitiRailcarViewModel {
		async map() {
			return {
				model: new RailcarModelSummaryModel(await BaseServer.unwrap(this.$$model.model)),
				graffitis: (await this.$$model.graffitis.includeTree(ViewModel.mappings[GraffitiSummaryModel.name].items).toArray()).map(item => new GraffitiSummaryModel(item)),
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
						[...parents, "model-GraffitiRailcarViewModel"]
					);
				},
				get graffitis() {
					return ViewModel.mappings[GraffitiSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "graffitis-GraffitiRailcarViewModel"]
					);
				},
				givenName: true,
				id: true,
				runningNumber: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiRailcarViewModel(null);
			"model" in data && (item.model = data.model && ViewModel.mappings[RailcarModelSummaryModel.name].toViewModel(data.model));
			"graffitis" in data && (item.graffitis = data.graffitis && [...data.graffitis].map(i => ViewModel.mappings[GraffitiSummaryModel.name].toViewModel(i)));
			"givenName" in data && (item.givenName = data.givenName === null ? null : `${data.givenName}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"runningNumber" in data && (item.runningNumber = data.runningNumber === null ? null : `${data.runningNumber}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: GraffitiRailcarViewModel) {
			let model: Railcar;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Railcar).find(viewModel.id)
			} else {
				model = new Railcar();
			}

			"model" in viewModel && (model.model.id = viewModel.model ? viewModel.model.id : null);
			"graffitis" in viewModel && (null);
			"givenName" in viewModel && (model.givenName = viewModel.givenName === null ? null : `${viewModel.givenName}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"runningNumber" in viewModel && (model.runningNumber = viewModel.runningNumber === null ? null : `${viewModel.runningNumber}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[RailcarViewModel.name]: class ComposedRailcarViewModel extends RailcarViewModel {
		async map() {
			return {
				headCoupler: new CouplerViewModel(await BaseServer.unwrap(this.$$model.headCoupler)),
				manufacturer: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.manufacturer)),
				model: new RailcarModelViewModel(await BaseServer.unwrap(this.$$model.model)),
				operator: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.operator)),
				owner: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.owner)),
				captures: (await this.$$model.captures.includeTree(ViewModel.mappings[CaptureViewModel.name].items).toArray()).map(item => new CaptureViewModel(item)),
				cargoLoads: (await this.$$model.cargoLoads.includeTree(ViewModel.mappings[RailcarCargoLoadViewModel.name].items).toArray()).map(item => new RailcarCargoLoadViewModel(item)),
				comissions: (await this.$$model.comissions.includeTree(ViewModel.mappings[RailcarComissionViewModel.name].items).toArray()).map(item => new RailcarComissionViewModel(item)),
				graffitis: (await this.$$model.graffitis.includeTree(ViewModel.mappings[GraffitiSummaryModel.name].items).toArray()).map(item => new GraffitiSummaryModel(item)),
				maintenanceJobs: (await this.$$model.maintenanceJobs.includeTree(ViewModel.mappings[MaintenanceSummaryModel.name].items).toArray()).map(item => new MaintenanceSummaryModel(item)),
				withdrawals: (await this.$$model.withdrawals.includeTree(ViewModel.mappings[RailcarWithdrawalViewModel.name].items).toArray()).map(item => new RailcarWithdrawalViewModel(item)),
				storageContainer: new StorageContainerSummaryModel(await BaseServer.unwrap(this.$$model.storageContainer)),
				tailCoupler: new CouplerViewModel(await BaseServer.unwrap(this.$$model.tailCoupler)),
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
				get headCoupler() {
					return ViewModel.mappings[CouplerViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "headCoupler-RailcarViewModel"]
					);
				},
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
				get cargoLoads() {
					return ViewModel.mappings[RailcarCargoLoadViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "cargoLoads-RailcarViewModel"]
					);
				},
				get comissions() {
					return ViewModel.mappings[RailcarComissionViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "comissions-RailcarViewModel"]
					);
				},
				get graffitis() {
					return ViewModel.mappings[GraffitiSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "graffitis-RailcarViewModel"]
					);
				},
				get maintenanceJobs() {
					return ViewModel.mappings[MaintenanceSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "maintenanceJobs-RailcarViewModel"]
					);
				},
				get withdrawals() {
					return ViewModel.mappings[RailcarWithdrawalViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "withdrawals-RailcarViewModel"]
					);
				},
				get storageContainer() {
					return ViewModel.mappings[StorageContainerSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "storageContainer-RailcarViewModel"]
					);
				},
				get tailCoupler() {
					return ViewModel.mappings[CouplerViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "tailCoupler-RailcarViewModel"]
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
			"headCoupler" in data && (item.headCoupler = data.headCoupler && ViewModel.mappings[CouplerViewModel.name].toViewModel(data.headCoupler));
			"manufacturer" in data && (item.manufacturer = data.manufacturer && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.manufacturer));
			"model" in data && (item.model = data.model && ViewModel.mappings[RailcarModelViewModel.name].toViewModel(data.model));
			"operator" in data && (item.operator = data.operator && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.operator));
			"owner" in data && (item.owner = data.owner && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.owner));
			"captures" in data && (item.captures = data.captures && [...data.captures].map(i => ViewModel.mappings[CaptureViewModel.name].toViewModel(i)));
			"cargoLoads" in data && (item.cargoLoads = data.cargoLoads && [...data.cargoLoads].map(i => ViewModel.mappings[RailcarCargoLoadViewModel.name].toViewModel(i)));
			"comissions" in data && (item.comissions = data.comissions && [...data.comissions].map(i => ViewModel.mappings[RailcarComissionViewModel.name].toViewModel(i)));
			"graffitis" in data && (item.graffitis = data.graffitis && [...data.graffitis].map(i => ViewModel.mappings[GraffitiSummaryModel.name].toViewModel(i)));
			"maintenanceJobs" in data && (item.maintenanceJobs = data.maintenanceJobs && [...data.maintenanceJobs].map(i => ViewModel.mappings[MaintenanceSummaryModel.name].toViewModel(i)));
			"withdrawals" in data && (item.withdrawals = data.withdrawals && [...data.withdrawals].map(i => ViewModel.mappings[RailcarWithdrawalViewModel.name].toViewModel(i)));
			"storageContainer" in data && (item.storageContainer = data.storageContainer && ViewModel.mappings[StorageContainerSummaryModel.name].toViewModel(data.storageContainer));
			"tailCoupler" in data && (item.tailCoupler = data.tailCoupler && ViewModel.mappings[CouplerViewModel.name].toViewModel(data.tailCoupler));
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

			"headCoupler" in viewModel && (model.headCoupler.id = viewModel.headCoupler ? viewModel.headCoupler.id : null);
			"manufacturer" in viewModel && (model.manufacturer.id = viewModel.manufacturer ? viewModel.manufacturer.id : null);
			"model" in viewModel && (model.model.id = viewModel.model ? viewModel.model.id : null);
			"operator" in viewModel && (model.operator.id = viewModel.operator ? viewModel.operator.id : null);
			"owner" in viewModel && (model.owner.id = viewModel.owner ? viewModel.owner.id : null);
			"captures" in viewModel && (null);
			"cargoLoads" in viewModel && (null);
			"comissions" in viewModel && (null);
			"graffitis" in viewModel && (null);
			"maintenanceJobs" in viewModel && (null);
			"withdrawals" in viewModel && (null);
			"storageContainer" in viewModel && (model.storageContainer.id = viewModel.storageContainer ? viewModel.storageContainer.id : null);
			"tailCoupler" in viewModel && (model.tailCoupler.id = viewModel.tailCoupler ? viewModel.tailCoupler.id : null);
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
	},
	[TrainProductBrandViewModel.name]: class ComposedTrainProductBrandViewModel extends TrainProductBrandViewModel {
		async map() {
			return {
				description: this.$$model.description,
				icon: this.$$model.icon,
				iconNegative: this.$$model.iconNegative,
				id: this.$$model.id,
				name: this.$$model.name,
				shortName: this.$$model.shortName,
				summary: this.$$model.summary
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
				description: true,
				icon: true,
				iconNegative: true,
				id: true,
				name: true,
				shortName: true,
				summary: true
			};
		};

		static toViewModel(data) {
			const item = new TrainProductBrandViewModel(null);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"icon" in data && (item.icon = data.icon === null ? null : `${data.icon}`);
			"iconNegative" in data && (item.iconNegative = data.iconNegative === null ? null : `${data.iconNegative}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortName" in data && (item.shortName = data.shortName === null ? null : `${data.shortName}`);
			"summary" in data && (item.summary = data.summary === null ? null : `${data.summary}`);

			return item;
		}

		static async toModel(viewModel: TrainProductBrandViewModel) {
			let model: TrainProductBrand;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainProductBrand).find(viewModel.id)
			} else {
				model = new TrainProductBrand();
			}

			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"icon" in viewModel && (model.icon = viewModel.icon === null ? null : `${viewModel.icon}`);
			"iconNegative" in viewModel && (model.iconNegative = viewModel.iconNegative === null ? null : `${viewModel.iconNegative}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortName" in viewModel && (model.shortName = viewModel.shortName === null ? null : `${viewModel.shortName}`);
			"summary" in viewModel && (model.summary = viewModel.summary === null ? null : `${viewModel.summary}`);

			return model;
		}
	},
	[TrainRailcarUnitViewModel.name]: class ComposedTrainRailcarUnitViewModel extends TrainRailcarUnitViewModel {
		async map() {
			return {
				model: new RailcarModelSummaryModel(await BaseServer.unwrap(this.$$model.model)),
				operator: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.operator)),
				owner: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.owner)),
				storageContainer: new StorageContainerSummaryModel(await BaseServer.unwrap(this.$$model.storageContainer)),
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
						[...parents, "model-TrainRailcarUnitViewModel"]
					);
				},
				get operator() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "operator-TrainRailcarUnitViewModel"]
					);
				},
				get owner() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "owner-TrainRailcarUnitViewModel"]
					);
				},
				get storageContainer() {
					return ViewModel.mappings[StorageContainerSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "storageContainer-TrainRailcarUnitViewModel"]
					);
				},
				givenName: true,
				id: true,
				runningNumber: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new TrainRailcarUnitViewModel(null);
			"model" in data && (item.model = data.model && ViewModel.mappings[RailcarModelSummaryModel.name].toViewModel(data.model));
			"operator" in data && (item.operator = data.operator && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.operator));
			"owner" in data && (item.owner = data.owner && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.owner));
			"storageContainer" in data && (item.storageContainer = data.storageContainer && ViewModel.mappings[StorageContainerSummaryModel.name].toViewModel(data.storageContainer));
			"givenName" in data && (item.givenName = data.givenName === null ? null : `${data.givenName}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"runningNumber" in data && (item.runningNumber = data.runningNumber === null ? null : `${data.runningNumber}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: TrainRailcarUnitViewModel) {
			let model: Railcar;

			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Railcar).find(viewModel.id)
			} else {
				model = new Railcar();
			}

			"model" in viewModel && (model.model.id = viewModel.model ? viewModel.model.id : null);
			"operator" in viewModel && (model.operator.id = viewModel.operator ? viewModel.operator.id : null);
			"owner" in viewModel && (model.owner.id = viewModel.owner ? viewModel.owner.id : null);
			"storageContainer" in viewModel && (model.storageContainer.id = viewModel.storageContainer ? viewModel.storageContainer.id : null);
			"givenName" in viewModel && (model.givenName = viewModel.givenName === null ? null : `${viewModel.givenName}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"runningNumber" in viewModel && (model.runningNumber = viewModel.runningNumber === null ? null : `${viewModel.runningNumber}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	}
};