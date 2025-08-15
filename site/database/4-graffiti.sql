CREATE TABLE artist (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,
	description TEXT,
	origin TEXT,

	logo TEXT,

	real BOOLEAN
);

CREATE TABLE graffiti_type (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,

	complexity INTEGER
);

CREATE TABLE graffiti (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,
	description TEXT,

	painted TIMESTAMP,
	artist_id UUID CONSTRAINT artist__graffitis REFERENCES artist (id),

	railcar_id UUID CONSTRAINT railcar__graffitis REFERENCES railcar (id),
	direction railcar_direction,
	type_id UUID CONSTRAINT type__graffitis REFERENCES graffiti_type (id)
);

CREATE TABLE graffiti_capture (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	graffiti_id UUID CONSTRAINT graffiti__captures REFERENCES graffiti (id),
	source_id UUID CONSTRAINT capture__ REFERENCES capture (id),

	top REAL,
	"left" REAL,
	width REAL,
	height REAL,

	thumbnail BYTEA
);
