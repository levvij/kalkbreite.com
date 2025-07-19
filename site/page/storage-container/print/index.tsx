import { Component } from "@acryps/page";
import { StorageContainerViewModel, StorageService } from "../../managed/services";
import { StorageContainerTagComponent } from "../../shared/storage-container-tag";
import { printStyle } from "./index.style";

export class PrintStorageContainerTagPage extends Component {
	static storageKey = 'storage-container-pending-print-tags';

	static addToQueue(tag: string) {
		const queue = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
		queue.push(tag);

		localStorage.setItem(this.storageKey, JSON.stringify(queue));
	}

	containers: StorageContainerViewModel[] = [];

	async onload() {
		for (let tag of JSON.parse(localStorage.getItem(PrintStorageContainerTagPage.storageKey) ?? '[]')) {
			this.containers.push(await new StorageService().getContainer(tag));
		}
	}

	render() {
		const sheet: HTMLElement = <ui-tag-sheet>
			{this.containers.map(container => new StorageContainerTagComponent(container))}
		</ui-tag-sheet>;

		requestAnimationFrame(async () => {
			for (let image of sheet.querySelectorAll('img') as any) {
				await new Promise<void>(done => {
					image.onload = () => done();

					if (image.naturalWidth) {
						done();
					}
				});
			}

			document.body.innerHTML = sheet.outerHTML;
			printStyle().apply();
		});

		return <ui-void></ui-void>;
	}
}
