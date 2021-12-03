
DROP TABLE IF EXISTS public.news;

CREATE TABLE public.news (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id character varying,
	title character varying not null,
	game character varying not null,
	region character varying not null,
	content character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
