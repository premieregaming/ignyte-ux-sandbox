
DROP TABLE IF EXISTS public.polls;

CREATE TABLE public.polls (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id uuid not null,
	content character varying not null,
	option1 character varying not null,
	option2 character varying not null,
	option3 character varying not null,
	option4 character varying not null,
	option5 character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
