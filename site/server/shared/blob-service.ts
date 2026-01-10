import { ManagedServer } from "../managed/server";

export interface BlobServiceItem {
	data: Buffer;
	mimeType: string;
}

export class BlobService {
	cache: Map<string, BlobServiceItem>;

	constructor(
		private server: ManagedServer,
		private route: string,
		private fetch: (identifier: string) => Promise<BlobServiceItem | null>,
		private parameterName = 'id',
		private empty?: BlobServiceItem
	) {
		server.app.get(route, async (request, response) => {
			const identifier = request.params[parameterName];

			if (this.cache) {
				if (request.headers['if-none-match'] == identifier) {
					return response.status(304).end();
				}
			}

			let blob: BlobServiceItem;

			// try to read the blob
			if (this.cache && this.cache.has(identifier)) {
				blob = this.cache.get(identifier);
			}

			if (!blob) {
				blob = await this.fetch(identifier);
			}

			// handle the blob
			if (!blob) {
				if (empty) {
					response.contentType(empty.mimeType);
					response.end(empty.data);

					return;
				}

				return response.status(404).end('blob not found');
			}

			response.setHeader('content-type', blob.mimeType);

			if (this.cache) {
				this.cache.set(identifier, blob);

				response.setHeader('cache-control', 'public, max-age=31536000, immutable');
				response.setHeader('etag', identifier);
			}

			response.end(blob.data);
		});
	}

	enableCache() {
		this.cache = new Map<string, BlobServiceItem>();
	}
}
