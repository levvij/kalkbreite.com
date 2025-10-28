import { Font, fontFamily, fontWeight, fontStyle, descendant, empty, before, content, attribute } from '@acryps/style';

export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?15e2fa0ed8df', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?0ad5b9d3aa22', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?31fb2fc361fc', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?d9e5cd524fc5', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?4c69155588f2', 'woff2');

export const icons = () => descendant('ui-icon') (
	fontFamily(iconFont.name),
	fontWeight('normal'),

	empty() ( before() (content('?'))),

	attribute('ui-container') ( before() (content('\f101')) ),
	attribute('ui-couple') ( before() (content('\f102')) ),
	attribute('ui-download') ( before() (content('\f103')) ),
	attribute('ui-flip') ( before() (content('\f104')) ),
	attribute('ui-go') ( before() (content('\f105')) ),
	attribute('ui-head-coupler') ( before() (content('\f106')) ),
	attribute('ui-length-including-buffers') ( before() (content('\f107')) ),
	attribute('ui-length-including-couplers') ( before() (content('\f108')) ),
	attribute('ui-reader') ( before() (content('\f109')) ),
	attribute('ui-tail-coupler') ( before() (content('\f10a')) ),
	attribute('ui-train-linkup') ( before() (content('\f10b')) ),
	attribute('ui-uncouple') ( before() (content('\f10c')) ),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const containerIcon = () => createIconElement('container');
export const coupleIcon = () => createIconElement('couple');
export const downloadIcon = () => createIconElement('download');
export const flipIcon = () => createIconElement('flip');
export const goIcon = () => createIconElement('go');
export const headCouplerIcon = () => createIconElement('head-coupler');
export const lengthIncludingBuffersIcon = () => createIconElement('length-including-buffers');
export const lengthIncludingCouplersIcon = () => createIconElement('length-including-couplers');
export const readerIcon = () => createIconElement('reader');
export const tailCouplerIcon = () => createIconElement('tail-coupler');
export const trainLinkupIcon = () => createIconElement('train-linkup');
export const uncoupleIcon = () => createIconElement('uncouple');
