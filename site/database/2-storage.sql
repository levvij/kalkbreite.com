CREATE TABLE storage_container (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT,

	name TEXT
);

ALTER TABLE railcar ADD storage_container_id UUID CONSTRAINT storage_container__railcars REFERENCES storage_container (id);
