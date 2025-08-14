CREATE TABLE account (
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,

	firstname TEXT,
	lastname TEXT,
	email TEXT,

	password_hash TEXT,
	salt TEXT
);

CREATE TABLE session (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	opened TIMESTAMP,
	key TEXT,

	account_id UUID CONSTRAINT account__sessions REFERENCES account (id)
);
