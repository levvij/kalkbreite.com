import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?506f4b55e5ea', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?731705337681', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?53bd092c05ab', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?d83733b129db', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?6328304c7695', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-container]').before('\f101'),
	style('[ui-length-including-buffers]').before('\f102'),
	style('[ui-length-including-couplers]').before('\f103'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const containerIcon = () => createIconElement('container');
export const lengthIncludingBuffersIcon = () => createIconElement('length-including-buffers');
export const lengthIncludingCouplersIcon = () => createIconElement('length-including-couplers');
