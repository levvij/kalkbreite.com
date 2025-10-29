CREATE TABLE camera (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	stream_source TEXT,

	resolution REAL,
	frame_interval INT
);

CREATE TABLE camera_blackout (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	camera_id UUID CONSTRAINT camera__blackouts REFERENCES camera (id),

	path TEXT
);
