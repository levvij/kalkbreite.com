import { Service } from "vlserver";
import { DbContext, Session } from "../managed/database";
import { SessionViewModel } from "./session";
import { RequestContext} from "./context";
import { Authentication } from "./authentication";
import { pbkdf2Sync, randomBytes } from "crypto";

export class SessionService extends Service {
	constructor(
		private database: DbContext,
		private session: Session,
		private authentication: Authentication
	) {
		super();
	}

	getSession() {
		return new SessionViewModel(this.session);
	}

	async login(mail: string, password: string) {
		const user = await this.database.account.first(account => account.email.valueOf() == mail);

		if (!user) {
			throw new Error('User does not exist');
		}

		if (user.passwordHash) {
			if ((await hashPassword(password, user.salt)) != user.passwordHash) {
				throw new Error('Invalid password');
			}
		} else {
			const salt = randomBytes(128).toString(bufferEncoding);
			const passwordHash = await hashPassword(password, salt);

			user.passwordHash = passwordHash;
			user.salt = salt;

			await user.update();
		}

		const session = this.session;

		session.account = user;
		await session.update();

		return new SessionViewModel(session);
	}
}

const bufferEncoding = 'base64';
const targetHashingDuration = 1000;

const hashPassword = async (password: string, salt: string) => {
	const iterations = 25000;
	const keyLength = 128;
	const hashAlgorithm = 'sha512';

	const hashStart = Date.now();
	const hash = pbkdf2Sync(password, salt, iterations, keyLength, hashAlgorithm).toString(bufferEncoding);
	const hashDuration = Date.now() - hashStart;

	await new Promise<void>(done => setTimeout(() => done(), targetHashingDuration - hashDuration));

	return hash;
};
