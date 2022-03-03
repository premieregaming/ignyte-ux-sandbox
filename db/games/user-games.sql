DROP TABLE IF EXISTS public.user_games;

CREATE TABLE public.user_games (

	user_id character varying not null,
	game_id character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);