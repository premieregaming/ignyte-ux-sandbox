
select 
	distinct(games.id), 
	games.name, 
	game_covers.url as cover_url, 
	exists ( select game_id from user_games where user_games.game_id = games.id and user_games.user_id = 'e6bf63a4-7f96-400b-8ea3-1b49e7fcccb6' ) as liked 
from games 
	left join game_platforms 
		on games.id = game_platforms.game_id 
	left join game_covers 
		on games.id = game_covers.game_id 
where game_platforms.platform_id in (SELECT unnest(string_to_array('130,159,47,4,18,37,19,20,21,137', ','))::int) 
limit 32
offset 0;