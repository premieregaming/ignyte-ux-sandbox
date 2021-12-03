
DROP TABLE IF EXISTS public.post_likes;

CREATE TABLE public.post_likes (
	post_id character varying not null,
	user_id character varying not null
);
