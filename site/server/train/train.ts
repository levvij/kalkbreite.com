import { ViewModel } from "vlserver";
import { TrainLabelViewModel } from "./label";
import { Train } from "@packtrack/train";
import { ResponseModel } from "vlserver/dist/resolve";
import { DbContext, TrainLabel } from "../managed/database";

export class TrainResponse extends ResponseModel {
	identifier: string;

	created: Date;
	changed: Date;
	railcarCount: number;
	coupledLength: number;

	headCouplerType: string;
	tailCouplerType: string;

	section: string;
	offset: number;
	reversed: boolean;

	label: TrainLabelViewModel;

	static async from(source: Train, database: DbContext) {
		const train = new TrainResponse();
		train.identifier = source.identifier;

		train.created = source.created;
		train.changed = source.changed;
		train.railcarCount = source.railcarCount;
		train.coupledLength = source.coupledLength;

		train.headCouplerType = source.headCouplerType?.name;
		train.tailCouplerType = source.tailCouplerType?.name;

		const head = source.head.nominal;
		train.section = head.section.domainName;
		train.offset = head.offset;
		train.reversed = head.reversed;

		train.label = new TrainLabelViewModel(
			await database.trainLabel
			.	include(ViewModel.mappings[TrainLabelViewModel.name].items)
				.first(label => label.trainIdentifier.valueOf() == train.identifier)
		);

		return train;
	}
}

export class TrainViewModel extends ViewModel<TrainResponse> {
	identifier;

	created;
	changed;
	railcarCount;
	coupledLength;

	headCouplerType;
	tailCouplerType;

	section;
	offset;
	reversed;

	label: TrainLabelViewModel;
}
