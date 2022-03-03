DROP TABLE IF EXISTS public.game_covers;

CREATE TABLE public.game_covers (
	id character varying primary key not null,
	game_id character varying not null,
	alpha_channel boolean,
	animated boolean,
	checksum character varying,
	height character varying,
	width character varying,
	image_id character varying,
	url character varying
);