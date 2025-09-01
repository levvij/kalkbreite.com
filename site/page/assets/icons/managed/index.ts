import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?a9d938fcc38d', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?6dec7c13454c', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?0bc68e48ad3f', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?65680499afa1', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?8624954238f8', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-container]').before('\f101'),
	style('[ui-go]').before('\f102'),
	style('[ui-head-coupler]').before('\f103'),
	style('[ui-length-including-buffers]').before('\f104'),
	style('[ui-length-including-couplers]').before('\f105'),
	style('[ui-reader]').before('\f106'),
	style('[ui-tail-coupler]').before('\f107'),
	style('[ui-train-linkup]').before('\f108'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const containerIcon = () => createIconElement('container');
export const goIcon = () => createIconElement('go');
export const headCouplerIcon = () => createIconElement('head-coupler');
export const lengthIncludingBuffersIcon = () => createIconElement('length-including-buffers');
export const lengthIncludingCouplersIcon = () => createIconElement('length-including-couplers');
export const readerIcon = () => createIconElement('reader');
export const tailCouplerIcon = () => createIconElement('tail-coupler');
export const trainLinkupIcon = () => createIconElement('train-linkup');
