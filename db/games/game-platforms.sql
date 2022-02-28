DROP TABLE IF EXISTS public.game_platforms;

CREATE TABLE public.game_platforms (
	id character varying primary key not null,
	abbreviation character varying,
	alternative_name character varying,
	category character varying,
	checksum character varying,
	created_at character varying,
	generation character varying,
	name character varying,
	platform_family character varying,
	platform_logo character varying,
	slug character varying,
	summary character varying,
	updated_at character varying,
	url character varying,
	versions character varying,
	websites character varying
);