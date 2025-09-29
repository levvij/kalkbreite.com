import { ViewModel } from "vlserver";
import { UicIdentifierClass, UicIdentifierIndexLetter } from "../managed/database";

export class UicIdentifierClassViewModel extends ViewModel<UicIdentifierClass> {
	code;

	name;
}

export class UicIdentifierIndexLetterViewModel extends ViewModel<UicIdentifierIndexLetter> {
	code;
	classFilter;

	name;
}
