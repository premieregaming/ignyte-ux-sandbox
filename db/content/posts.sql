
DROP TABLE IF EXISTS public.posts;

CREATE TABLE public.posts (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id character varying not null,
	post_content character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
