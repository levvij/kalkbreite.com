import { Filter, Filtering } from ".";

export class FilterContext<ItemType> {
	static empty() {
		return new FilterContext<any>(
			Math.random().toString(), // save into the ether
			[]
		);
	}

	onChange: () => void;

	constructor(
		public key: string,
		public filters: Filtering<ItemType>[]
	) {
		const storageKey = `filter-${key}`;
		const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');

		for (let filter of filters) {
			if (filter.name in saved) {
				filter.value = saved[filter.name];
			}

			filter.onChange = () => {
				saved[filter.name] = filter.value;
				localStorage.setItem(storageKey, JSON.stringify(saved));

				this.onChange();
			};
		}
	}

	reduce(items: ItemType[]) {
		return items.filter(item => this.filter(item));
	}

	private filter(item: ItemType) {
		for (let filter of this.filters) {
			if (!filter.apply(item)) {
				return false;
			}
		}

		return true;
	}
}
