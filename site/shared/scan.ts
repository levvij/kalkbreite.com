import { RailcarViewModel } from "../server/railcar/railcar";

type ScanRailcarContext = {
	tag: string,
	storageContainer: string,
	train: string,
	openMaintenance: string
}

export class ScanRoute {
	constructor(
		public source: string,
		public target: (railcar: ScanRailcarContext) => string
	) {}
}

export const scanRoutes = [
	new ScanRoute('read', ({ tag }) => `/railcar/${tag}`),
	new ScanRoute('trace', ({ tag }) => `/live/trace/${tag}`),
	new ScanRoute('train', ({ train }) => `/train/${train}`),
	new ScanRoute('storage', ({ storageContainer }) => `/storage-container/${storageContainer}`),
	new ScanRoute('maintenance', ({ tag, openMaintenance }) => openMaintenance ? `/railcar/${tag}/maintenance/${openMaintenance}` : `/railcar/${tag}`),
	new ScanRoute('graffiti', ({ tag }) => `/railcar/${tag}`),
	new ScanRoute('register/graffiti', ({ tag }) => `/railcar/${tag}/register-graffiti`)
];
