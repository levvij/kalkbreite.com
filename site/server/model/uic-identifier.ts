import { ViewModel } from "vlserver";
import { UicIdentifierClass, UicIdentifierIndexLetter, UicLocale } from "../managed/database";

export class UicIdentifierClassViewModel extends ViewModel<UicIdentifierClass> {
	code;

	name;
}

export class UicIdentifierIndexLetterViewModel extends ViewModel<UicIdentifierIndexLetter> {
	code;
	classFilter;
	uicLocaleId;

	name;
}

export class UicLocaleViewModel extends ViewModel<UicLocale> {
	id;

	name;
}
