DROP TABLE IF EXISTS public.game_covers;

CREATE TABLE public.game_covers (
	id integer primary key not null,
	game_id integer not null,
	alpha_channel boolean,
	animated boolean,
	checksum character varying,
	height integer,
	width integer,
	image_id character varying,
	url character varying
);

alter table game_covers add constraint game_covers_id_fk foreign key (game_id) references games (id);
create index game_covers_game_idx on game_covers (game_id);