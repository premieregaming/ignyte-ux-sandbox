
DROP TABLE IF EXISTS public.post_tags;

CREATE TABLE public.post_tags (
	post_id character varying not null,
	user_id character varying not null
);
