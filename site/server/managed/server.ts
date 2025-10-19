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
import { GraffitiTypeViewModel } from "././../graffiti/graffiti";
import { GraffitiViewModel } from "././../graffiti/graffiti";
import { CaptureViewModel } from "././../capture/capture";
import { cropGraffiti } from "././../../shared/crop-graffiti";
import { ArtistViewModel } from "././../graffiti/artist";
import { GraffitiInspirationSummaryModel } from "././../graffiti/inspiration";
import { GraffitiInspirationViewModel } from "././../graffiti/inspiration";
import { GraffitiService } from "././../graffiti/index";
import { CollisionIncident } from "././database";
import { DecouplingIncident } from "././database";
import { DerailingIncident } from "././database";
import { PowerLossIncident } from "././database";
import { IncidentService } from "././../incident/index";
import { MaintenanceViewModel } from "././../maintenace/maintenace";
import { Maintenance } from "././database";
import { MaintenanceService } from "././../maintenace/index";
import { UicIdentifierIndexLetter } from "././database";
import { RailcarModelViewModel } from "././../railcar/model";
import { RailcarSummaryModel } from "././../railcar/railcar";
import { UicIdentifierClassViewModel } from "././../model/uic-identifier";
import { UicIdentifierIndexLetterViewModel } from "././../model/uic-identifier";
import { RailcarModelService } from "././../model/index";
import { RailcarViewModel } from "././../railcar/railcar";
import { updateThumbnail } from "././../capture/thumbnail";
import { RailcarService } from "././../railcar/index";
import { Session } from "././database";
import { SessionViewModel } from "././../session/session";
import { RequestContext } from "././../session/context";
import { Authentication } from "././../session/authentication";
import { SessionService } from "././../session/index";
import { StorageContainerViewModel } from "././../storage/storage-contaiuner";
import { StorageService } from "././../storage/index";
import { Coupling } from "././database";
import { Uncoupling } from "././database";
import { TrainChain } from "././../train/chain";
import { TrainViewModel } from "././../train/train";
import { TrainRailcarUnitViewModel } from "././../train/unit";
import { TrainUnitViewModel } from "././../train/unit";
import { TrainService } from "././../train/index";
import { ArtistSummaryModel } from "./../graffiti/artist";
import { GraffitiSummaryModel } from "./../graffiti/graffiti";
import { GraffitiInspirationMediaViewModel } from "./../graffiti/inspiration";
import { MaintenanceSummaryModel } from "./../maintenace/maintenace";
import { UicLocaleViewModel } from "./../model/uic-identifier";
import { CouplerViewModel } from "./../railcar/coupler";
import { CouplerTypeSummaryModel } from "./../railcar/coupler";
import { RailcarModelSummaryModel } from "./../railcar/model";
import { RailcarModelDrawingSummaryModel } from "./../railcar/model";
import { AccountViewModel } from "./../session/session";
import { StorageContainerSummaryModel } from "./../storage/storage-contaiuner";
import { CouplingViewModel } from "./../train/coupling";
import { GraffitiRailcarViewModel } from "./../railcar/railcar";
import { Capture } from "./../managed/database";
import { Company } from "./../managed/database";
import { Artist } from "./../managed/database";
import { GraffitiCapture } from "./../managed/database";
import { GraffitiType } from "./../managed/database";
import { UicIdentifierClass } from "./../managed/database";
import { UicLocale } from "./../managed/database";
import { Coupler } from "./../managed/database";
import { CouplerType } from "./../managed/database";
import { RailcarModel } from "./../managed/database";
import { RailcarModelDrawing } from "./../managed/database";
import { Railcar } from "./../managed/database";
import { Account } from "./../managed/database";
import { StorageContainer } from "./../managed/database";
import { Train } from "./../train/chain/train";

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
		parameters: ["DbContext","TrainChain"]
	},
	"TrainChain": {
		objectConstructor: TrainChain,
		parameters: []
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
			"Q1eDA2YTg2dWFwMzhtY2FwOWR3cDNobX",
			{},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.getArtists(
				
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
			"Q1N2BlY3V2dHtsc3Z0NWMwYTN2bDhkaW",
			{
			"BzeHhhd2Z3M2JhcGk4NWxwbWJhNTFrdD": { type: "buffer", isArray: false, isOptional: false },
				"xzMmE5ZXE2dWMwMGkwZmdqaTBuemVjM3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(GraffitiService),
			(controller, params) => controller.createInspiration(
				params["BzeHhhd2Z3M2JhcGk4NWxwbWJhNTFrdD"],
				params["xzMmE5ZXE2dWMwMGkwZmdqaTBuemVjM3"]
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
			"lremFlenJmcXFuNDNwMGx1c3ZhMmdkZH",
			{
			"pxOG8zbGY4ODRubmJ5cjFjb3lpZT4ya2": { type: "string", isArray: false, isOptional: false },
				"p3OTw0YWp6eWM1NnNqZWFzZmYwZTlwZG": { type: "number", isArray: false, isOptional: false },
				"NxejQ1bXE1cmhnMHBtYTprODdzc3N5Zn": { type: "string", isArray: false, isOptional: false },
				"hraWdneWx3NnNyM2F3aDh2a2NxNnV0YW": { type: "date", isArray: false, isOptional: false }
			},
			inject => inject.construct(IncidentService),
			(controller, params) => controller.reportDerailment(
				params["pxOG8zbGY4ODRubmJ5cjFjb3lpZT4ya2"],
				params["p3OTw0YWp6eWM1NnNqZWFzZmYwZTlwZG"],
				params["NxejQ1bXE1cmhnMHBtYTprODdzc3N5Zn"],
				params["hraWdneWx3NnNyM2F3aDh2a2NxNnV0YW"]
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
			"lzOGlqcTd0eWhnYTZ0Y2A3czJsYm95cj",
			{
			"F5Z3U5ZXFxeWd3cHY3MmA3YXB2MnV4Zn": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getTrain(
				params["F5Z3U5ZXFxeWd3cHY3MmA3YXB2MnV4Zn"]
			)
		);

		this.expose(
			"lrcDJxc3wya2t2bGZlOHMxdTQ3OXI2cH",
			{
			"10czNubHltczN4cXhubmRxNzdiMWR0b3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getUnitTrain(
				params["10czNubHltczN4cXhubmRxNzdiMWR0b3"]
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
			"type" in data && (item.type = data.type && ViewModel.mappings[GraffitiTypeViewModel.name].toViewModel(data.type));
			"direction" in data && (item.direction = data.direction === null ? null : data.direction);
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
				captured: true,
				id: true,
				name: true,
				origin: true,
				paintingUrge: true
			};
		};

		static toViewModel(data) {
			const item = new GraffitiInspirationSummaryModel(null);
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
	[CouplerViewModel.name]: class ComposedCouplerViewModel extends CouplerViewModel {
		async map() {
			return {
				type: new CouplerTypeSummaryModel(await BaseServer.unwrap(this.$$model.type)),
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
					return ViewModel.mappings[CouplerTypeSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-CouplerViewModel"]
					);
				},
				id: true
			};
		};

		static toViewModel(data) {
			const item = new CouplerViewModel(null);
			"type" in data && (item.type = data.type && ViewModel.mappings[CouplerTypeSummaryModel.name].toViewModel(data.type));
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
				icon: true,
				id: true
			};
		};

		static toViewModel(data) {
			const item = new CouplerTypeSummaryModel(null);
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
			
			"icon" in viewModel && (model.icon = viewModel.icon === null ? null : `${viewModel.icon}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

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
	[TrainViewModel.name]: class ComposedTrainViewModel extends TrainViewModel {
		async map() {
			return {
				changed: this.$$model.changed,
				identifier: this.$$model.identifier,
				created: this.$$model.created,
				length: this.$$model.length
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
				changed: true,
				identifier: true,
				created: true,
				length: true
			};
		};

		static toViewModel(data) {
			const item = new TrainViewModel(null);
			"changed" in data && (item.changed = data.changed === null ? null : new Date(data.changed));
			"identifier" in data && (item.identifier = data.identifier === null ? null : `${data.identifier}`);
			"created" in data && (item.created = data.created === null ? null : new Date(data.created));
			"length" in data && (item.length = data.length === null ? null : +data.length);

			return item;
		}

		static async toModel(viewModel: TrainViewModel) {
			const model = new Train();
			
			"changed" in viewModel && (model.changed = viewModel.changed === null ? null : new Date(viewModel.changed));
			"identifier" in viewModel && (model.identifier = viewModel.identifier === null ? null : `${viewModel.identifier}`);
			"created" in viewModel && (model.created = viewModel.created === null ? null : new Date(viewModel.created));
			"length" in viewModel && (model.length = viewModel.length === null ? null : +viewModel.length);

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
			"railcar" in data && (item.railcar = data.railcar && ViewModel.mappings[GraffitiRailcarViewModel.name].toViewModel(data.railcar));
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
	[RailcarModelViewModel.name]: class ComposedRailcarModelViewModel extends RailcarModelViewModel {
		async map() {
			return {
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
				graffitis: (await this.$$model.graffitis.includeTree(ViewModel.mappings[GraffitiSummaryModel.name].items).toArray()).map(item => new GraffitiSummaryModel(item)),
				maintenanceJobs: (await this.$$model.maintenanceJobs.includeTree(ViewModel.mappings[MaintenanceSummaryModel.name].items).toArray()).map(item => new MaintenanceSummaryModel(item)),
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
			"graffitis" in data && (item.graffitis = data.graffitis && [...data.graffitis].map(i => ViewModel.mappings[GraffitiSummaryModel.name].toViewModel(i)));
			"maintenanceJobs" in data && (item.maintenanceJobs = data.maintenanceJobs && [...data.maintenanceJobs].map(i => ViewModel.mappings[MaintenanceSummaryModel.name].toViewModel(i)));
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
			"graffitis" in viewModel && (null);
			"maintenanceJobs" in viewModel && (null);
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