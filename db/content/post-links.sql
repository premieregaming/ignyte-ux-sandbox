
DROP TABLE IF EXISTS public.post_likes;

CREATE TABLE public.post_likes (
	post_id character varying not null,
	link character varying not null
);
