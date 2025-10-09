import { Layout } from "@packtrack/layout";

export class LayoutLoader {
	private static cache: Layout;
	private static task: Promise<Layout>;

	static async load() {
		if (this.cache) {
			return this.cache;
		}

		if (this.task) {
			return await this.task;
		}

		this.task = new Promise(async done => {
			let source = await fetch('/layout/source/index.rml').then(response => response.text());

			// remove <!rml> that the brwoser parser cannot read
			source = source.split('\n').slice(1).join('\n');

			const document = new DOMParser().parseFromString(source, 'application/xml');

			done(this.cache = Layout.from(document));
		});

		return await this.task;
	}
}
