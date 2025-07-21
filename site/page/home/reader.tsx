import { Component } from "@acryps/page";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/library";
import { readerIcon } from "../assets/icons/managed";

export class ReaderComponent extends Component {
	reader = new BrowserMultiFormatReader();
	device: MediaDeviceInfo;

	render() {
		if (!this.device) {
			return <ui-action ui-click={() => {
				this.setup();
			}}>
				{readerIcon()} Read Tag
			</ui-action>;
		}

		this.reader.reset();

		const video = document.createElement('video');
		video.playsInline = true;
		video.muted = true;

		this.reader.decodeFromVideoDevice(this.device.deviceId, video, (result, error) => {
			if (result) {
				this.navigate('/railcar/' + result.getText());
			}
		});

		return <ui-reader>
			READER

			{video}
		</ui-reader>;
	}

	async setup() {
		const devices = await this.reader.listVideoInputDevices();
		this.device = devices[0];

		if (!this.device) {
			throw new Error('No capture device');
		}

		this.update();
	}
}
