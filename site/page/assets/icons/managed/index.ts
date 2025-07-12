import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?7a211dd59f01', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?76f33c393458', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?1b68d2ad3bea', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?35001065ef24', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?1713a4754285', 'woff2');

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
