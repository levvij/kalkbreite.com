import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?443f555403b4', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?23fd14a97285', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?6f96a14c1554', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?7fc8e88edcf2', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?d0b444024fa0', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-container]').before('\f101'),
	style('[ui-couple]').before('\f102'),
	style('[ui-go]').before('\f103'),
	style('[ui-head-coupler]').before('\f104'),
	style('[ui-length-including-buffers]').before('\f105'),
	style('[ui-length-including-couplers]').before('\f106'),
	style('[ui-reader]').before('\f107'),
	style('[ui-tail-coupler]').before('\f108'),
	style('[ui-train-linkup]').before('\f109'),
	style('[ui-uncouple]').before('\f10a'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const containerIcon = () => createIconElement('container');
export const coupleIcon = () => createIconElement('couple');
export const goIcon = () => createIconElement('go');
export const headCouplerIcon = () => createIconElement('head-coupler');
export const lengthIncludingBuffersIcon = () => createIconElement('length-including-buffers');
export const lengthIncludingCouplersIcon = () => createIconElement('length-including-couplers');
export const readerIcon = () => createIconElement('reader');
export const tailCouplerIcon = () => createIconElement('tail-coupler');
export const trainLinkupIcon = () => createIconElement('train-linkup');
export const uncoupleIcon = () => createIconElement('uncouple');
