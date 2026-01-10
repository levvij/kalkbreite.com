DROP TABLE capture_session;
DROP TABLE capture_frame;

CREATE TABLE capture_session (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	captured TIMESTAMP,

	data BYTEA,
	byte_length INT,
	mime_type TEXT,

	thumbnail BYTEA,

	corrupted TIMESTAMP,
	reviewed TIMESTAMP
);

ALTER TABLE capture ADD session_id UUID CONSTRAINT session__railcar_captures REFERENCES capture_session (id);
ALTER TABLE capture ADD session_buffer_offset REAL;
