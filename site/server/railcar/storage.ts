import { ViewModel } from "vlserver";
import { RailcarComission, RailcarWithdrawal } from "../managed/database";

export class RailcarComissionViewModel extends ViewModel<RailcarComission> {
	comissioned;

	section;
}

export class RailcarWithdrawalViewModel extends ViewModel<RailcarWithdrawal> {
	withdrawn;
}
