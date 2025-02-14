import { toBuffer } from "bwip-js";
import { ManagedServer } from "../managed/server";

export const registerTagInterface = (server: ManagedServer) => {
	server.app.get('/tag/:tag', (request, response) => {
		const tag = request.params.tag;

		return toBuffer({
			bcid: 'datamatrix',
			text: tag,
			scale: 1,
			includetext: false
		}, (error, image) => {
			response.contentType('image/png');
			response.end(image);
		})
	});
};
