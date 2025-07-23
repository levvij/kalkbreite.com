ALTER TABLE company ADD shortname TEXT;
ALTER TABLE company ADD tag TEXT;
UPDATE company SET tag = LOWER(REPLACE(shortname, ' ', '-'));

ALTER TABLE railcar_model ADD tag TEXT;
UPDATE railcar_model SET tag = LOWER(REPLACE(shortname, ' ', '-'));

ALTER TABLE railcar_model ADD description TEXT;
ALTER TABLE railcar_model ADD summary TEXT;
