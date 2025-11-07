import { ViewModel } from "vlserver";
import { TrainLabelViewModel } from "./label";
import { Train } from "@packtrack/train";
import { ResponseModel } from "vlserver/dist/resolve";

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

	static from(source: Train) {
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
}
