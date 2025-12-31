import { display, marginInline, max, maxWidth, min, rem, vw } from "@acryps/style";

export const maximumBoxedWidth = rem(80);

export const boxed = () => [
	display('block'),
	maxWidth(maximumBoxedWidth),
	marginInline('auto'),
];

export const boxedOversize = min(
	vw(50).subtract(maximumBoxedWidth.divide(2)).invert(),
	vw(0)
);

export const boxedOversizeInverse = max(
	vw(50).subtract(maximumBoxedWidth.divide(2)),
	vw(0)
);
