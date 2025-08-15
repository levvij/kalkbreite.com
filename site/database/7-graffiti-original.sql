CREATE TABLE graffiti_inspiration (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,
	description TEXT,
	origin TEXT,
	captured TIMESTAMP,

	painting_effort REAL,
	painting_urge REAL,

	artist_id UUID CONSTRAINT artist__originals REFERENCES artist (id)
);

CREATE TABLE graffiti_inspiration_media (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	data BYTEA,
	mime_type TEXT,
	uploaded TIMESTAMP,

	graffiti_inspiration_id UUID CONSTRAINT graffiti_inspiration__media REFERENCES graffiti_inspiration (id)
);

ALTER TABLE graffiti ADD graffiti_inspiration_id UUID CONSTRAINT graffiti_inspiration__paintings REFERENCES graffiti_inspiration (id);
