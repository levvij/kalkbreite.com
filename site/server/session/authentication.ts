import { Account } from "../managed/database";

export class Authentication {
	constructor(
		private account?: Account
	) {}

	edit = !!this.account
}
