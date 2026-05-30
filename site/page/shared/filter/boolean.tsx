import { Filter } from ".";
import { Component } from "@acryps/page";

export class BooleanFilter<ItemType> extends Filter<ItemType, boolean> {
	constructor(
		name: string,
		value: boolean,
		filter: (item: ItemType) => boolean,
	) {
		super(name, value, item => {
			if (this.value) {
				return filter(item);
			}

			return true;
		});
	}

	render() {
		return <ui-filter ui-active={this.value} ui-click={() => {
			this.value = !this.value;

			this.onChange();
		}}>
			<ui-name>
				{this.name}
			</ui-name>
		</ui-filter>
	}
}
