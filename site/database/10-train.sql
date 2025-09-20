CREATE TABLE coupler (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
);

ALTER TABLE railcar ADD head_coupler_id UUID CONSTRAINT head_coupler__ REFERENCES coupler (id);
ALTER TABLE railcar ADD tail_coupler_id UUID CONSTRAINT tail_coupler__ REFERENCES coupler (id);

INSERT INTO coupler (id)
SELECT ('00000000-0000-0001-0000-' || SUBSTRING(id::TEXT, 25))::UUID
FROM railcar;

INSERT INTO coupler (id)
SELECT ('00000000-0000-0002-0000-' || SUBSTRING(id::TEXT, 25))::UUID
FROM railcar;

UPDATE railcar SET
	head_coupler_id = ('00000000-0000-0001-0000-' || SUBSTRING(id::TEXT, 25))::UUID,
	tail_coupler_id = ('00000000-0000-0002-0000-' || SUBSTRING(id::TEXT, 25))::UUID;

CREATE TABLE coupling (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	source_id UUID CONSTRAINT source__ REFERENCES coupler (id),
	target_id UUID CONSTRAINT target__ REFERENCES coupler (id),

	coupled TIMESTAMP
);

CREATE TABLE uncoupling (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	source_id UUID CONSTRAINT source__ REFERENCES coupler (id),

	uncoupled TIMESTAMP
);
