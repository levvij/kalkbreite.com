import { randomBytes } from "crypto";
import { DbContext, Session } from "../managed/database";
import { Authentication } from "./authentication";

export class RequestContext {
	static readonly sessionCookieName = 'kalkbreite';

	session: Session;
	authentication: Authentication;

	private constructor() {}

	static async create(request, response, database: DbContext) {
		let context = new RequestContext();

		const sessionKey = request.cookies[RequestContext.sessionCookieName];

		if (sessionKey) {
			const session = await database.session
				.include(session => session.account)
				.first(session => session.key.valueOf() == sessionKey);

			if (session) {
				context.session = session;
			}
		}

		if (!sessionKey || !context.session) {
			context.session = await RequestContext.createSession(request, database);
			response.cookie(RequestContext.sessionCookieName, context.session.key, { maxAge: 1000 * 60 * 60 * 24 * 365 });
		}

		context.authentication = new Authentication(await context.session.account.fetch());

		return context;
	}

	private static async createSession(request, database: DbContext) {
		const session = new Session();
		session.key = randomBytes(256).toString('hex');
		session.opened = new Date();

		return session.create();
	}
}
