
DROP TABLE IF EXISTS public.post_likes;

CREATE TABLE public.post_likes (
	post_id uuid not null,
	user_id uuid not null
);
