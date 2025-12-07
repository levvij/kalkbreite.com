import { setTimeout } from "timers";
import { DbSet, Entity, Queryable, QueryProxy } from "vlquery";

export enum SearchMatch {
	exact = 0,
	prefix = 1,
	near = 2
}

export class SearchManager {
	private topics: SearchTopic<any>[] = [];

	register(topic: SearchTopic<any>) {
		this.topics.push(topic);
	}

	async scheduleIndexUpdate() {
		await this.update();

		setTimeout(() => this.scheduleIndexUpdate(), 1000 * 60 * 60);
	}

	async update() {
		console.log(`[search] updating index...`);

		let count = 0;

		for (let topic of this.topics) {
			await topic.update();

			count += topic.terms.length;

			await new Promise(done => setTimeout(done));
		}

		console.log(`[search] index contains ${count} items in ${this.topics.length} topics`);
	}

	async search(query: string) {
		query = SearchManager.normalize(query);

		let best: SearchResult;

		for (let topic of this.topics) {
			for (let term of topic.terms) {
				const result = term.matches(query);

				if (result) {
					if (result.distance == 0) {
						return result;
					}

					if (!best) {
						best = result;
					}

					if (result.distance <= best.distance) {
						let previous = 0;
						let updated = 0;

						for (let index = 1; index < query.length; index++) {
							const subsearch = query.substring(0, index);

							previous += best.term.shorten(index).matches(subsearch)?.distance ?? Infinity;
							updated += term.shorten(index).matches(subsearch)?.distance ?? Infinity;
						}

						if (previous > updated) {
							best = result;
						}
					}
				}
			}

			await new Promise(done => setTimeout(done));
		}

		return best;
	}

	static normalize(query: string) {
		if (!query) {
			return null;
		}

		return query
			.toLowerCase()
			.trim();
	}
}

export class SearchResult {
	constructor(
		public term: SearchTerm,
		public distance: number
	) {}
}

export type SearchTopicTransformer<ItemType> = (item: ItemType) => SearchTerm;

export class SearchTopic<ItemType> {
	transformers: SearchTopicTransformer<ItemType>[] = [];
	terms: SearchTerm[] = [];

	constructor(
		private source: () => Promise<ItemType[]>,
		private linkItem: (item: ItemType) => string
	) {}

	expose(transformer: SearchTopicTransformer<ItemType>) {
		this.transformers.push(transformer);

		return this;
	}

	async update() {
		const items = await this.source();
		const terms: SearchTerm[] = [];

		for (let item of items) {
			for (let transformer of this.transformers) {
				const term = transformer(item);
				term.link = this.linkItem(item);

				if (term.searchable) {
					terms.push(term);

					const plain = term.plain();

					if (plain) {
						plain.link = this.linkItem(item);
						terms.push(plain);
					}
				}
			}

			await new Promise(done => setTimeout(done));
		}

		terms.sort((a, b) => a.match - b.match);

		this.terms = terms;
	}
}

export class SearchTerm {
	link: string;

	constructor(
		public term: string,
		public match = SearchMatch.prefix,
		public weight = 1
	) {
		this.term = SearchManager.normalize(term);
	}

	get searchable() {
		return !!this.term;
	}

	plain() {
		const plain = this.term.replace(/[^a-z0-9]/g, '');

		if (plain != this.term && plain) {
			return new SearchTerm(plain, this.match, this.weight * 1.1);
		}
	}

	shorten(length: number) {
		return new SearchTerm(
			this.term.substring(0, length),
			this.match
		);
	}

	matches(query: string) {
		switch (this.match) {
			case SearchMatch.exact: {
				if (query == this.term) {
					return new SearchResult(this, 0);
				}

				return;
			}

			case SearchMatch.prefix: {
				if (this.term.startsWith(query)) {
					return new SearchResult(this, (this.term.length - query.length) * this.weight);
				}

				return;
			}

			case SearchMatch.near: {
				return new SearchResult(this, this.levenshtein(this.term, query) * this.weight);
			}
		}
	}

	private levenshtein(a: string, b: string): number {
		if (a === b) return 0;

		const lengthA = a.length;
		const lengthB = b.length;

		if (lengthA === 0) return lengthB;
		if (lengthB === 0) return lengthA;

		if (lengthA > lengthB) {
			[a, b] = [b, a];
		}

		const m = a.length;
		const n = b.length;

		let previous = new Uint16Array(m + 1);
		let current = new Uint16Array(m + 1);

		for (let index = 0; index <= m; index++) {
			previous[index] = index;
		}

		for (let loop = 1; loop <= n; loop++) {
			current[0] = loop;
			const bj = b.charCodeAt(loop - 1);

			for (let index = 1; index <= m; index++) {
				const cost = a.charCodeAt(index - 1) === bj ? 0 : 1;

				const deletion = previous[index] + 1;
				const insertion = current[index - 1] + 1;
				const substitution = previous[index - 1] + cost;

				let value = deletion < insertion ? deletion : insertion;
				if (substitution < value) value = substitution;

				current[index] = value;
			}

			const tmp = previous;
			previous = current;
			current = tmp;
		}

		return previous[m];
	}
}
