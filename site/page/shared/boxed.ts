import { display, marginInline, maxWidth, rem } from "@acryps/style";

export const maximumBoxedWidth = rem(80);

export const boxed = () => [
	display('block'),
	maxWidth(maximumBoxedWidth),
	marginInline('auto'),
];
