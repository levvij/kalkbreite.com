import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?e3ce635f51a0', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?828c4f587dcf', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?0c626c1e3c9b', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?8ee28b2ddb54', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?f3ebd4669cac', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-container]').before('\f101'),
	style('[ui-length-including-buffers]').before('\f102'),
	style('[ui-length-including-couplers]').before('\f103'),
	style('[ui-reader]').before('\f104'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const containerIcon = () => createIconElement('container');
export const lengthIncludingBuffersIcon = () => createIconElement('length-including-buffers');
export const lengthIncludingCouplersIcon = () => createIconElement('length-including-couplers');
export const readerIcon = () => createIconElement('reader');
