
DROP TABLE IF EXISTS public.post_media;

CREATE TABLE public.post_media (
	post_id uuid not null,
	img_url character varying not null,
	img_type character varying not null
);
