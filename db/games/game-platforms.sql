DROP TABLE IF EXISTS public.game_platforms;

CREATE TABLE public.game_platforms (
	game_id character varying not null,
	platform_id character varying not null
);