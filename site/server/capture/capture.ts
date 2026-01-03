import { ViewModel } from "vlserver";
import { Capture, CaptureSession } from "../managed/database";

export class CaptureViewModel extends ViewModel<Capture> {
	id;

	captured;
	direction;
	corrupted;
	bufferAnchorOffset;
}

export class CaptureSessionViewModel extends ViewModel<CaptureSession> {
	id;
	captured;

	corrupted;
	reviewed;
}
