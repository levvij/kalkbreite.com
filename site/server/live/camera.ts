import { ViewModel } from "vlserver";
import { Camera } from "../managed/database";

export class CameraViewModel extends ViewModel<Camera> {
	id;
	name;
}
