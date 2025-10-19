CREATE TABLE decoupling_incident (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	section TEXT,
	position REAL,

	failed TIMESTAMP,

	coupler_id UUID CONSTRAINT coupler__decoupling_incidents REFERENCES coupler (id)
);

CREATE TABLE derailing_incident (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	section TEXT,
	position REAL,

	failed TIMESTAMP,

	railcar_id UUID CONSTRAINT railcar__derailing_incidents REFERENCES railcar (id)
);

CREATE TABLE collision_incident (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	section TEXT,
	position REAL,

	failed TIMESTAMP,

	source_railcar_id UUID CONSTRAINT source_railcar__colision_source_incidents REFERENCES railcar (id),
	target_railcar_id UUID CONSTRAINT target_railcar__colision_target_incidents REFERENCES railcar (id)
);

CREATE TABLE power_loss_incident (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	section TEXT,
	position REAL,

	failed TIMESTAMP,

	railcar_id UUID CONSTRAINT railcar__power_loss_incidents REFERENCES railcar (id)
);
