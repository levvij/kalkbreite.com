import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?d366eff7a560', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?b1c458f55de7', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?889c930ae35b', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?b6e5823156ed', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?c3b2d5f0bb63', 'woff2');

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
