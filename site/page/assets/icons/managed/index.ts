import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?afae61c5f115', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?ff3076fda6b9', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?01fe40215783', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?34828bb168e9', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?7a0868feb4e1', 'woff2');

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
