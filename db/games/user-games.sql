DROP TABLE IF EXISTS public.user_games;

CREATE TABLE public.user_games (
	user_id uuid not null,
	game_id integer not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);