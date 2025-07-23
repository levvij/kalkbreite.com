ALTER TABLE company ADD shortname TEXT;
ALTER TABLE company ADD description TEXT;

ALTER TABLE company ADD tag TEXT;
UPDATE company SET tag = LOWER(REPLACE(shortname, ' ', '-')) WHERE tag IS NULL;

ALTER TABLE railcar_model ADD tag TEXT;
UPDATE railcar_model SET tag = LOWER(REPLACE(shortname, ' ', '-')) WHERE tag IS NULL;

ALTER TABLE railcar_model ADD description TEXT;
ALTER TABLE railcar_model ADD summary TEXT;

ALTER TABLE artist ADD tag TEXT;
UPDATE artist SET tag = LOWER(REPLACE(name, ' ', '-')) WHERE tag IS NULL;

ALTER TABLE artist ADD summary TEXT;
