DROP TABLE IF EXISTS public.game_genres;

CREATE TABLE public.game_genres (
	id character varying not null,
	name character varying not null,
	slug character varying not null,
	url character varying not null
);
