DROP TABLE IF EXISTS public.game_platforms;

CREATE TABLE public.game_platforms (
	game_id integer not null,
	platform_id integer not null
);