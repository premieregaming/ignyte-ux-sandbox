DROP TABLE IF EXISTS public.games;

CREATE TABLE public.games (
	id character varying not null,
	age_ratings character varying,
	aggregated_rating character varying,
	aggregated_rating_count character varying,
	alternative_names character varying,
	artworks character varying,
	bundles character varying,
	category character varying,
	checksum character varying,
	collection character varying,
	cover character varying,
	created_at character varying,
	dlcs character varying,
	expanded_games character varying,
	expansions character varying,
	external_games character varying,
	first_release_date character varying,
	follows character varying,
	forks character varying,
	franchise character varying,
	franchises character varying,
	game_engines character varying,
	game_modes character varying,
	genres character varying,
	hypes character varying,
	involved_companies character varying,
	keywords character varying,
	multiplayer_modes character varying,
	name character varying,
	parent_game character varying,
	platforms character varying,
	player_perspectives character varying,
	ports character varying,
	rating character varying,
	rating_count character varying,
	release_dates character varying,
	remakes character varying,
	remasters character varying,
	screenshots character varying,
	similar_games character varying,
	slug character varying,
	standalone_expansions character varying,
	status character varying,
	storyline character varying,
	summary character varying,
	tags character varying,
	themes character varying,
	total_rating character varying,
	total_rating_count character varying,
	updated_at character varying,
	url character varying,
	version_parent character varying,
	version_title character varying,
	videos character varying,
	websites character varying
);