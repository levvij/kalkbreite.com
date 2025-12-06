import { TrainChain } from "@packtrack/train";
import { Artist, ArtistQueryProxy, DbContext, Railcar } from "../managed/database";
import { SearchManager, SearchMatch, SearchTerm, SearchTopic } from "./term";

export const registerSearchTopics = (database: DbContext, chain: TrainChain, search: SearchManager) => {
	search.register(new SearchTopic(() => database.artist.toArray(), item => `/artist/${item.tag}`)
		.expose(item => new SearchTerm(item.name, SearchMatch.near))
	);

	search.register(new SearchTopic(() => database.company.toArray(), item => `/company/${item.tag}`)
		.expose(item => new SearchTerm(item.name, SearchMatch.near))
	);

	search.register(new SearchTopic(() => database.graffiti.toArray(), item => `/graffiti/${item.id}`)
		.expose(item => new SearchTerm(item.name, SearchMatch.near))
	);

	search.register(new SearchTopic(() => database.railcar.toArray(), item => `/railcar/${item.tag}`)
		.expose(item => new SearchTerm(item.tag, SearchMatch.exact))
		.expose(item => new SearchTerm(item.givenName, SearchMatch.near))
		.expose(item => new SearchTerm(item.runningNumber, SearchMatch.near))
	);

	search.register(new SearchTopic(() => database.railcarModel.toArray(), item => `/model/${item.tag}`)
		.expose(item => new SearchTerm(item.tag, SearchMatch.exact))
		.expose(item => new SearchTerm(item.name, SearchMatch.near))
		.expose(item => new SearchTerm(item.uicIdentifier, SearchMatch.near))
	);

	search.register(new SearchTopic(() => database.storageContainer.toArray(), item => `/storage-container/${item.tag}`)
		.expose(item => new SearchTerm(item.tag, SearchMatch.exact))
		.expose(item => new SearchTerm(item.name, SearchMatch.near))
	);

	search.register(new SearchTopic(
		() => database.traction
			.include(traction => traction.railcar)
			.toArray(),
		item => `/railcar/${(item.railcar['$stored'] as any as Railcar)?.tag}`
	)
		.expose(item => new SearchTerm(`dcc${item.dccAddress}`, SearchMatch.exact))
	);

	search.register(new SearchTopic(() => database.trainLabel.toArray(), item => `/train/${item.trainIdentifier}`)
		.expose(item => new SearchTerm(item.label, SearchMatch.near))
	);

	search.register(new SearchTopic(async () => chain.trains, item => `/train/${item.identifier}`)
		.expose(item => new SearchTerm(item.identifier, SearchMatch.prefix))
	);
};
