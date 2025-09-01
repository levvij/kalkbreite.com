import { Font } from "@acryps/style";

export const displayFont = new Font('pressura-display')
	.addSource('/assets/font/display.woff2');

export const monospacedFont = new Font('pressura-monospace')
	.addSource('/assets/font/monospace.woff2');

export const trainIdentifierFont = monospacedFont;
