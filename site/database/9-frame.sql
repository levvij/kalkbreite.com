CREATE TABLE capture_session (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created TIMESTAMP
);

CREATE TABLE capture_frame (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	uploaded TIMESTAMP,

	offset_x INTEGER,
	offset_y INTEGER,

	data BYTEA,
	thumbnail BYTEA,

	session_id UUID CONSTRAINT session__frames REFERENCES capture_session (id)
);
