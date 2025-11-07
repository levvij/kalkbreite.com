CREATE TABLE railcar_comission (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	comissioned TIMESTAMP,

	section TEXT,
	offset REAL,
	reversed BOOLEAN,

	railcar_id UUID CONSTRAINT railcar__ REFERENCES railcar (id)
);

CREATE TABLE railcar_withdrawal (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	withdrawn TIMESTAMP,

	railcar_id UUID CONSTRAINT railcar__ REFERENCES railcar (id)
);

ALTER TABLE railcar REMOVE stored;
