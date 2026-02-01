import { Component } from "@acryps/page";

export type Filtering<ItemType> = Filter<ItemType, unknown>;

export class Filter<ItemType, FilterValueType> extends Component {
	onChange: () => void;

	constructor(
		public name: string,
		public value: FilterValueType,
		public apply: (item: ItemType) => boolean,
	) {
		super();
	}
}
