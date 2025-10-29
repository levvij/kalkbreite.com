import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { CameraViewModel } from "./camera";

export class LiveService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	getCameras() {
		return CameraViewModel.from(this.database.camera.orderByAscending(camera => camera.name));
	}
}
