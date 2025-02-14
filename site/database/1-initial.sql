CREATE EXTENSION "uuid-ossp";

CREATE TABLE company (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,

	parent_id UUID CONSTRAINT parent__children REFERENCES company (id),

	logo_id UUID CONSTRAINT logo__ REFERENCES company_logo (id),
	icon_id UUID CONSTRAINT icon__ REFERENCES company_logo (id)
);

CREATE TABLE company_logo (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	data BYTEA,
	mime_type TEXT
);

CREATE TABLE railcar_model (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	shortname TEXT,

	length_including_buffers REAL,
	length_including_couplers REAL
);

CREATE TABLE railcar (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT,

	running_number TEXT,
	given_name TEXT,
	note TEXT,
	model_id UUID CONSTRAINT model__railcars REFERENCES model (id),

	operator_id UUID CONSTRAINT operator__operated_railcars REFERENCES company (id),

	owner_id UUID CONSTRAINT owner__owned_railcars REFERENCES company (id),
	aquired TIMESTAMP,
	sale_price REAL,

	manufacturer_id UUID CONSTRAINT manufacturer__manufactured_railcars REFERENCES company (id)
);

CREATE TABLE capture (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	railcar_id UUID CONSTRAINT railcar__captures REFERENCES railcar (id),
	captured TIMESTAMP,

	data BYTEA,
	mime_type TEXT
);
