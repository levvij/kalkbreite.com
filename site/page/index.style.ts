import { aspectRatio, hex, ratio, rem } from "@acryps/style";
import { monospacedFont } from "./assets/font";

export const primaryColor = hex('000');
export const primaryContrastColor = hex('fff');

export const knockoutColor = hex('222');
export const knockoutContrastColor = hex('fff');

export const warningColor = hex('ffd61b');
export const warningContrastColor = hex('000');

export const dangerColor = hex('ba3d3b');
export const dangerContrastColor = hex('fff');

export const pageColor = hex('64ab7d');
export const pageContrastColor = hex('fff');

export const pageSpacing = rem(2);
export const pageGutter = rem(1);

export const captureAspectRatio = ratio(3, 1);
export const captureBackgroundColor = hex('fff');

export const runningNumberFont = monospacedFont.name;
export const tagFont = monospacedFont.name;
