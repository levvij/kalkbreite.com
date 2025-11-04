import { readdir, readFile } from "fs/promises";
import { DbContext, TrainProductBrand } from "../managed/database";

export const importTrainProductBrands = async (database: DbContext) => {
	const existing = await database.trainProductBrand.toArray();

	for (let file of await readdir('.')) {
		if (file.endsWith('.svg') && !file.includes('-negative')) {
			const content = await (await readFile(file)).toString();

			if (existing.find(peer => peer.icon == content)) {
				continue;
			}

			console.log(file);

			let negative: string;

			try {
				negative = await (await readFile(file.replace('.svg', '-negative.svg'))).toString();
			} catch {
				negative = content;
			}

			const brand = new TrainProductBrand();
			brand.shortName = brand.name = file.replace('.svg', '').replace(/-/g, ' ').toUpperCase();
			brand.icon = content;
			brand.iconNegative = negative;

			await brand.create();
		}
	}
}
