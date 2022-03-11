DROP TABLE IF EXISTS public.game_platforms;

CREATE TABLE public.game_platforms (
	game_id integer not null,
	platform_id integer not null
);

alter table game_platforms add constraint game_platforms_fk foreign key (game_id) references games (id);
create index game_platforms_game_idx on game_platforms (game_id);
create index game_platforms_platform_idx on game_platforms (platform_id);