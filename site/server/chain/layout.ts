import { Layout } from "@packtrack/layout";
import { readFile } from "fs/promises";
import { join } from "path";
import { Application } from "..";
import { DOMParser } from "@xmldom/xmldom";

export class LayoutLoader {
	async load() {
		let content = (await readFile(join(process.cwd(), '..', '..', 'layout', 'index.rml'))).toString();

		// remove <!rml> that the brwoser parser cannot read
		content = content.split('\n').slice(1).join('\n');

		const document = new DOMParser().parseFromString(content, 'application/xml');

		return Layout.from(document.firstChild);
	}
}

export function findSection(domainName: string) {
	for (let district of Application.layout.allDistricts) {
		for (let section of district.sections) {
			if (section.domainName == domainName) {
				return section;
			}
		}
	}
}
