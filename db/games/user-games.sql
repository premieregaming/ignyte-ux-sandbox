DROP TABLE IF EXISTS public.user_games;

CREATE TABLE public.user_games (
	user_id uuid not null,
	game_id integer not null,
	username character varying,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	unique (user_id, game_id)
);

alter table user_games add constraint user_games_user_fk foreign key (user_id) references users (id);
alter table user_games add constraint user_games_game_fk foreign key (game_id) references games (id);
create index user_games_user_idx on user_games (user_id);
create index user_games_game_idx on user_games (game_id);