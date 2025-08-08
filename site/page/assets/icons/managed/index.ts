import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?486209cc5195', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?ff3076fda6b9', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?660224a09d8d', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?327e0d1e2cf7', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?ae86d566c596', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-container]').before('\f101'),
	style('[ui-go]').before('\f102'),
	style('[ui-length-including-buffers]').before('\f103'),
	style('[ui-length-including-couplers]').before('\f104'),
	style('[ui-reader]').before('\f105'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const containerIcon = () => createIconElement('container');
export const goIcon = () => createIconElement('go');
export const lengthIncludingBuffersIcon = () => createIconElement('length-including-buffers');
export const lengthIncludingCouplersIcon = () => createIconElement('length-including-couplers');
export const readerIcon = () => createIconElement('reader');
