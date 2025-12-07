ALTER TABLE artist ADD featured INTEGER;
ALTER TABLE graffiti ADD featured INTEGER;

ALTER TABLE graffiti ADD painter_id UUID CONSTRAINT painter__painted_graffitis REFERENCES artist (id);
