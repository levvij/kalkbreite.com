import { ViewModel } from "vlserver";
import { Account, Session } from "../managed/database";

export class SessionViewModel extends ViewModel<Session> {
	id;

	account: AccountViewModel;
}

export class AccountViewModel extends ViewModel<Account> {
	id;

	name;
}
