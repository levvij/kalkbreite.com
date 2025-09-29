import { Font, fontFamily, fontWeight, fontStyle, descendant, empty, before, content, attribute } from '@acryps/style';

export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?bf2ba2b88048', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?23fd14a97285', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?f9711e5e9a9c', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?67ce57b65c43', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?fd658d9cbdac', 'woff2');

export const icons = () => descendant('ui-icon') (
	fontFamily(iconFont.name),
	fontWeight('normal'),

	empty() ( before() (content('?'))),

	attribute('ui-container') ( before() (content('\f101')) ),
	attribute('ui-couple') ( before() (content('\f102')) ),
	attribute('ui-go') ( before() (content('\f103')) ),
	attribute('ui-head-coupler') ( before() (content('\f104')) ),
	attribute('ui-length-including-buffers') ( before() (content('\f105')) ),
	attribute('ui-length-including-couplers') ( before() (content('\f106')) ),
	attribute('ui-reader') ( before() (content('\f107')) ),
	attribute('ui-tail-coupler') ( before() (content('\f108')) ),
	attribute('ui-train-linkup') ( before() (content('\f109')) ),
	attribute('ui-uncouple') ( before() (content('\f10a')) ),
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
