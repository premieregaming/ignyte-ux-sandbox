
DROP TABLE IF EXISTS public.user_education;

CREATE TABLE public.user_education (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id character varying not null,
	school_type character varying not null,
	school_name character varying not null,
	degree character varying,
	classyear int,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
