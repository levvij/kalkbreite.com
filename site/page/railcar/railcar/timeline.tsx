import { Component, ComponentContent } from "@acryps/page";

interface TimelineItem {
	date: Date;
	content: ComponentContent;
}

export class TimelineComponent extends Component {
	items: TimelineItem[] = [];

	addItem(date: Date, content: ComponentContent) {
		if (!date || isNaN(+date)) {
			return;
		}

		this.items.push({ date, content });

		if (this.rootNode) {
			this.update();
		}
	}

	addItems<ItemType>(items: ItemType[], convert: (item: ItemType) => [Date, ComponentContent]) {
		for (let item of items) {
			this.addItem(...convert(item));
		}
	}

	render() {
		this.items.sort((a, b) => a.date > b.date ? -1 : 1);

		const timeline: HTMLElement = <ui-timeline></ui-timeline>;

		if (!this.items.length) {
			return timeline;
		}

		let lastDay;

		for (let item of this.items) {
			let day = item.date.toLocaleDateString();

			if (item.date.getDate() == 1 && item.date.getMonth() == 0) {
				day = item.date.getFullYear().toString();
			}

			if (lastDay != day) {
				timeline.appendChild(<ui-date>
					{day}
				</ui-date>);

				lastDay = day;
			}

			let time = item.date.toLocaleTimeString();

			if (item.date.getHours() == 0 && item.date.getMinutes() == 0) {
				time = '';
			}

			timeline.appendChild(<ui-item>
				<ui-time>
					{time}
				</ui-time>

				<ui-content>
					{item.content}
				</ui-content>
			</ui-item>);
		}

		return timeline;
	}
}
