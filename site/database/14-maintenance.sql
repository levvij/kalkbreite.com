CREATE TABLE maintenance (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	started TIMESTAMP,
	completed TIMESTAMP,

	title TEXT,
	issue TEXT,
	description TEXT,
	cost REAL,

	railcar_id UUID CONSTRAINT railcar__maintenance_jobs REFERENCES railcar (id)
);
