CREATE TABLE uic_locale (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT
);

ALTER TABLE railcar_model ADD uic_locale_id UUID CONSTRAINT uic_locale__ REFERENCES uic_locale (id);
ALTER TABLE uic_identifier_index_letter ADD uic_locale_id UUID CONSTRAINT uic_locale__index_letters REFERENCES uic_locale (id);
