CREATE TYPE railcar_direction AS ENUM ('forward', 'reverse');

ALTER TABLE capture ADD direction railcar_direction;
ALTER TABLE capture ADD thumbnail BYTEA;
