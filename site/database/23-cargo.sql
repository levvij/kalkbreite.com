-- contains ways that load types can be mounted onto railcars
-- for example, 40" magnetic mount, but not 40" high cube magnetic mount.
-- because 40" and 40" high cube are compatible
CREATE TABLE cargo_fixture (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,
	length REAL
);

-- forms of container to contain loads
-- for example 6 axle lorry, 40" high cube container, ...
CREATE TABLE cargo_load_type (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,
	fixture_id UUID CONSTRAINT fixture__load_types REFERENCES cargo_fixture (id),

	-- how much the item extends the fixture
	-- for example, 45" containers use a 40" fixuture
	oversize_head REAL,
	oversize_tail REAL
);

-- where a fixture is installed on a railcar
-- overlaps are calculated using offset length and oversize
CREATE TABLE cargo_slot (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	railcar_model_id UUID CONSTRAINT railcar_model__cargo_slots REFERENCES railcar_model (id),

	"offset" REAL,
	fixture_id UUID CONSTRAINT fixture__slots REFERENCES cargo_fixture (id),

	-- direction of the slot on the railcar
	-- null if both are the same
	direction railcar_direction,

	-- how much can be oversized
	-- null = can extend freely
	-- 0 = end of trailer, cannot extend
	clearance_head REAL,
	clearance_tail REAL
);
