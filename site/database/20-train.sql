-- name as defined by https://digital.sbb.ch/en/foundation/assets/fpl/
CREATE TABLE train_product_brand (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	short_name TEXT,

	summary TEXT,
	description TEXT,

	icon TEXT,
	icon_negative TEXT
);

CREATE TABLE train_label (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	train_identifier TEXT UNIQUE,

	label TEXT,
	description TEXT,

	product_brand_id UUID CONSTRAINT product_brand__trains REFERENCES train_product_brand (id)
);

CREATE TABLE train_head_position (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	train_identifier TEXT,

	section TEXT,
	"offset" REAL,
	reversed BOOLEAN,

	updated TIMESTAMP
);
