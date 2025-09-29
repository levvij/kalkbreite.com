CREATE TABLE coupler_type (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	icon TEXT
);

ALTER TABLE coupler ADD type_id UUID CONSTRAINT type__couplers REFERENCES coupler_type (id);
