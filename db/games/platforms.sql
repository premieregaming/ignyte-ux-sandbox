DROP TABLE IF EXISTS public.platforms;

CREATE TABLE public.platforms (
	id integer primary key not null,
	abbreviation character varying,
	alternative_name character varying,
	category integer,
	checksum character varying,
	created_at character varying,
	generation character varying,
	name character varying,
	platform_family integer,
	platform_logo integer,
	slug character varying,
	summary character varying,
	updated_at timestamp without time zone,
	url character varying,
	versions character varying,
	websites character varying
);