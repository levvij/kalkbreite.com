import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?1b0a53e59fbb', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?ff3076fda6b9', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?141218c10935', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?c88038782938', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?7b77ba6cde79', 'woff2');

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
