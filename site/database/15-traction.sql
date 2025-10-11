CREATE TABLE traction (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	maximum_speed REAL,

	acceleration REAL,
	deceleration REAL,

	dcc_address INT,

	railcar_id UUID CONSTRAINT railcar__traction_actors REFERENCES railcar (id)
);
