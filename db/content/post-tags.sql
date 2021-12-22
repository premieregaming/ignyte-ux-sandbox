
DROP TABLE IF EXISTS public.post_tags;

CREATE TABLE public.post_tags (
	post_id uuid not null,
	user_id uuid not null
);
