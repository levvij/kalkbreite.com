import { toBuffer } from "bwip-js";
import { ManagedServer } from "../managed/server";

export const registerStorageTagInterface = (server: ManagedServer) => {
	server.app.get('/tag/storage/:tag', (request, response) => {
		const tag = request.params.tag;

		return toBuffer({
			bcid: 'pdf417',
			text: tag,
			scale: 1,
			includetext: false
		}, (error, image) => {
			response.contentType('image/png');
			response.end(image);
		})
	});
};
