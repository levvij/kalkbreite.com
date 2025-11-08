import { aspectRatio, backgroundImage, colorStop, hex, linearGradient, percentage, ratio, rem, turn } from "@acryps/style";
import { monospacedFont } from "./assets/font";

export const primaryColor = hex('64ab7d');
export const primaryContrastColor = hex('fff');
export const primaryOutlineColor = hex('428a5a');

export const knockoutColor = hex('222');
export const knockoutContrastColor = hex('fff');
export const knockoutOutlineColor = hex('444');

export const warningColor = hex('ffd61b');
export const warningContrastColor = hex('000');

export const dangerColor = hex('ba3d3b');
export const dangerContrastColor = hex('fff');

export const markerColor = hex('ff0');
export const trainOccupiedColor = hex('f00');
export const positionerColor = hex('66f');

export const pageColor = hex('fff');
export const pageTransparentColor = hex('fff0');
export const pageContrastColor = hex('000');

export const pageSpacing = rem(1.25);
export const pageGutter = rem(0.75);
export const radius = rem(0.25);

export const captureAspectRatio = ratio(3, 1);
export const captureBackgroundColor = hex('eee');

export const runningNumberFont = monospacedFont.name;
export const tagFont = monospacedFont.name;
