import { RailcarDirection } from "../server/managed/database";

export const reverse = (direction: RailcarDirection) => {
	switch (direction) {
		case RailcarDirection.forward: return RailcarDirection.reverse;
		case RailcarDirection.reverse: return RailcarDirection.forward;
	}
}
