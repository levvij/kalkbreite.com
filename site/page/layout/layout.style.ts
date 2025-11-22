import { hex, ColorValue } from "@acryps/style";
import { DecouplingIncidentViewModel, DerailingIncidentViewModel, PowerLossIncidentViewModel, CollisionIncidentViewModel } from "../managed/services";

export type Incident = DecouplingIncidentViewModel & DerailingIncidentViewModel & PowerLossIncidentViewModel & CollisionIncidentViewModel;

export const markerColor = hex('ff0');
export const trainOccupiedColor = hex('f00');
export const positionerColor = hex('66f');

export const incidentColor = new Map<new () => Incident, { color: ColorValue, label: string }>()
	.set(DecouplingIncidentViewModel, { color: hex('2cb507'), label: 'Decoupling' })
	.set(DerailingIncidentViewModel, { color: hex('e09028'), label: 'Derailing' })
	.set(CollisionIncidentViewModel, { color: hex('e01432'), label: 'Collision' })
	.set(PowerLossIncidentViewModel, { color: hex('dbd839'), label: 'Power Loss' })
