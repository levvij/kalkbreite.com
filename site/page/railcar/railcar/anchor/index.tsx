import { Component } from "@acryps/page";
import { RailcarPage } from "..";
import { CaptureViewModel, RailcarService } from "../../../managed/services";
import { CropComponent } from "../../../shared/crop";

export class CaptureAnchorPage extends Component {
	declare parent: RailcarPage;
	declare parameters: { captureId };

	inset = {
		left: 0
	};

	cropper: CropComponent<{ left: number }>;

	render() {
		this.cropper = new CropComponent(`/capture/${this.parameters.captureId}`, this.inset, () => {
			console.log()
		})
			.addHandle('left', 'x')

		return <ui-anchor>
			<ui-hint>
				Set anchor to bottom corner of the buffer or the item limiting the railcars length in the length over buffer measurement.
			</ui-hint>

			{this.cropper}

			<ui-actions>
				<ui-action ui-click={() => {
					// do not wait, as the query needs to load the entire capture
					new RailcarService().setAnchor(this.parameters.captureId, this.inset.left);

					this.navigate('../..');
				}}>
					Set Anchor
				</ui-action>
			</ui-actions>
		</ui-anchor>
	}
}
