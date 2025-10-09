CREATE TABLE railcar_model_drawing (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	railcar_model_id UUID CONSTRAINT railcar_model__drawings REFERENCES railcar_model (id),

	name TEXT,
	image BYTEA,
	source TEXT
);

ALTER TABLE railcar_model ADD uic_identifier TEXT;

CREATE TABLE uic_identifier_class (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	code TEXT,

	name TEXT,
	description TEXT
);

CREATE TABLE uic_identifier_index_letter (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	code TEXT,

	name TEXT,
	class_filter TEXT
);
