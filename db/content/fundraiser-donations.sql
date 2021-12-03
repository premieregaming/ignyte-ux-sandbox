
DROP TABLE IF EXISTS public.fundraisers;

CREATE TABLE public.fundraisers (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id character varying not null,
	amount character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
