import { Component } from "@acryps/page";
import { RailcarModelService, UicIdentifierClassViewModel, UicIdentifierIndexLetterViewModel } from "../managed/services";

export class UicIdentifierComponent extends Component {
	static classes: UicIdentifierClassViewModel[];
	static indexLetters: UicIdentifierIndexLetterViewModel[];

	constructor(
		private code: string
	) {
		super();
	}

	async onload() {
		if (!UicIdentifierComponent.classes) {
			UicIdentifierComponent.classes = await new RailcarModelService().getUicClasses();
		}

		if (!UicIdentifierComponent.indexLetters) {
			UicIdentifierComponent.indexLetters = await new RailcarModelService().getUicIndexLetters();
		}
	}

	render() {
		const classes = this.findClasses(this.code);

		if (classes.length == 0) {
			return <ui-uic-identifier>
				No class applies to {this.code}
			</ui-uic-identifier>
		}

		return <ui-uic-identifier>
			{classes.map(identifierClass => <ui-part ui-type='class'>
				<ui-code>
					{identifierClass.code}
				</ui-code>

				<ui-name>
					{identifierClass.name}
				</ui-name>
			</ui-part>)}

			{this.findModifiers(classes, this.code).map(modifier => <ui-part ui-type='index-letter'>
				<ui-code>
					{modifier.code}
				</ui-code>

				<ui-name>
					{modifier.name}
				</ui-name>
			</ui-part>)}
		</ui-uic-identifier>
	}

	findClasses(code: string) {
		// try to match the longest possible class
		const sorted = UicIdentifierComponent.classes
			.toSorted((a, b) => b.code.length - a.code.length);

		const applied: UicIdentifierClassViewModel[] = [];

		for (let source of sorted) {
			if (code.startsWith(source.code)) {
				applied.push(source);

				code = code.replace(source.code, '');
			}
		}

		return applied;
	}

	findModifiers(classes: UicIdentifierClassViewModel[], code: string) {
		const indexLetterCodes = this.parseIndexLetters(code);

		// try to match the longest possible class
		const sortedClasses = UicIdentifierComponent.classes
			.toSorted((a, b) => b.code.length - a.code.length);

		const appliedModifiers: UicIdentifierClassViewModel[] = [];

		for (let indexLetterCode of indexLetterCodes) {
			const appliedIndexLetters = new Map<UicIdentifierClassViewModel, number>();
			const indexLetterVariants = UicIdentifierComponent.indexLetters.filter(indexLetter => indexLetter.code == indexLetterCode);

			for (let indexLetter of indexLetterVariants) {
				const filterOptions = this.parseClassFilter(indexLetter.classFilter);

				if (filterOptions) {
					for (let filter of filterOptions) {
						if (this.applies(code, filter)) {
							appliedIndexLetters.set(indexLetter, filter.length);
						}
					}
				} else {
					appliedIndexLetters.set(indexLetter, 0);
				}
			}

			// only the longest modifiers apply
			// multiple may apply if they have the same length
			const maxLength = Math.max(...appliedIndexLetters.values());

			for (let [modifier, length] of appliedIndexLetters) {
				if (length == maxLength) {
					appliedModifiers.push(modifier);
				}
			}
		}

		return appliedModifiers;
	}

	private applies(code: string, filter: string) {
		const appliedClasses = this.findClasses(code);

		for (let requiredClass of this.findClasses(filter) ?? []) {
			if (!appliedClasses.includes(requiredClass)) {
				return false;
			}
		}

		const appliedFilters = this.parseIndexLetters(code);

		for (let requiredFilter of this.parseIndexLetters(filter)) {
			if (!appliedFilters.includes(requiredFilter)) {
				return false;
			}
		}

		return true;
	}

	private parseClassFilter(filter: string) {
		if (!filter) {
			return null;
		}

		return filter.split(',');
	}

	private parseIndexLetters(code: string) {
		// remove class names
		code = code.replace(/^[A-Z]+/, '');

		const parts = [];

		while (code.length) {
			const character = code[0];
			let length = 1;

			while (code[length] == character) {
				length++;
			}

			code = code.substring(length);
			parts.push(character.repeat(length));
		}

		return parts;
	}
}
