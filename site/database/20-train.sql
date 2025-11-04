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

	product_brand_id UUID CONSTRAINT product_brand__trains REFERENCES train_product_brand (id),
	operator_id UUID CONSTRAINT operator__operated_trains REFERENCES company (id)
);

CREATE TABLE train_head_position (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	train_identifier TEXT,

	section TEXT,
	"offset" REAL,
	reversed BOOLEAN,

	updated TIMESTAMP
);

CREATE OR REPLACE VIEW last_train_head_position AS (
	SELECT DISTINCT ON (train_head_position.train_identifier)
		train_head_position.train_identifier,
		train_head_position.section,
		train_head_position.offset,
		train_head_position.reversed,
		train_head_position.updated,
		train_label.label,
		train_product_brand.icon
	FROM train_head_position
		INNER JOIN train_label ON train_label.train_identifier = train_head_position.train_identifier
		INNER JOIN train_product_brand ON train_product_brand.id = train_label.product_brand_id
	ORDER BY
		train_head_position.train_identifier DESC,
		train_head_position.updated DESC
);
