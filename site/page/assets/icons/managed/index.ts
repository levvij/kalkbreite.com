import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?3461863da959', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?76f33c393458', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?822187d9d404', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?f023b8f2d3a2', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?64f798d2f3c5', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-length-including-buffers]').before('\f101'),
	style('[ui-length-including-couplers]').before('\f102'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const lengthIncludingBuffersIcon = () => createIconElement('length-including-buffers');
export const lengthIncludingCouplersIcon = () => createIconElement('length-including-couplers');
