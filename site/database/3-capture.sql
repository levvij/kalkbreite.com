CREATE TYPE railcar_direction AS ENUM ('forward', 'reverse');

ALTER TABLE capture ADD direction railcar_direction;
