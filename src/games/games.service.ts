import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LikeGameDto } from './dto/like-game.dto';
import { RetrieveAllGamesDto } from './dto/retrieve-all-games.dto';

@Injectable()
export class GamesService {

	constructor(private readonly db: DatabaseService) {}

	async retrieve_user_game_count(x: RetrieveAllGamesDto): Promise<any> {

		return new Promise<any>((resolve, reject) => {

			try {

				let sql = 'select count(distinct(games.id)) from games left join game_platforms on games.id = game_platforms.game_id'
				sql += ' left join game_covers on games.id = game_covers.game_id left join user_games on games.id = user_games.game_id where user_games.user_id = $1'
				let search = x.search.trim()
				let values = []

				if (x.platforms.length) {

					if (search.length) {
						sql += " and (games.name ilike $2 or games.name ilike $3) "
						sql += " and game_platforms.platform_id in (SELECT unnest(string_to_array($4, ','))::int);"
						values = [ x.user_id, '%' + search + '%', search + '%', x.platforms.join(',') ]
					}
					else {
						sql += " and game_platforms.platform_id in (SELECT unnest(string_to_array($2, ','))::int);"
						values = [ x.user_id, x.platforms.join(',') ]
					}
				}
				else {
					if (search.length) {
						sql += ` and (games.name ilike $2 or games.name ilike $3); `
						values = [ x.user_id, '%' + search + '%', search + '%' ]
					}
					else {
						values = [ x.user_id ]
					}
				}


				// let sql = 'select count(*) from user_games where user_id = $1'
				this.db.query(sql, values).then((res) => { resolve(res[0]['count']) })
			}
			catch (e) { reject(false) }
		})
	}

	async retrieve_user_games(x: RetrieveAllGamesDto): Promise<any> {

		return new Promise<any>((resolve, reject) => {

			try {

				let sql = 'select distinct(games.id), games.name, game_covers.url as cover_url from games left join game_platforms on games.id = game_platforms.game_id'
				sql += ' left join game_covers on games.id = game_covers.game_id left join user_games on games.id = user_games.game_id where user_games.user_id = $1'
				let search = x.search.trim()
				let values = []

				if (x.platforms.length) {

					if (search.length) {
						sql += " and (games.name ilike $2 or games.name ilike $3) "
						sql += " and game_platforms.platform_id in (SELECT unnest(string_to_array($4, ','))::int) limit $5 offset $6;"
						values = [ x.user_id, '%' + search + '%', search + '%', x.platforms.join(','), x.limit, x.offset ]
					}
					else {
						sql += " and game_platforms.platform_id in (SELECT unnest(string_to_array($2, ','))::int) limit $3 offset $4;"
						values = [ x.user_id, x.platforms.join(','), x.limit, x.offset ]
					}
				}
				else {
					if (search.length) {
						sql += ` and (games.name ilike $2 or games.name ilike $3) limit $4 offset $5; `
						values = [ x.user_id, '%' + search + '%', search + '%', x.limit, x.offset ]
					}
					else {
						sql += ` limit $2 offset $3; `
						values = [ x.user_id, x.limit, x.offset ]
					}
				}

				this.db.query(sql, values).then((res) => { resolve(res) })
			}
			catch (e) { reject(false) }
		})
	}

	async retrieve_all_games(x: RetrieveAllGamesDto) {

		return new Promise<any>((resolve, reject) => {

			try {

				let sql = 'select distinct(games.id), games.name, game_covers.url as cover_url from games left join game_platforms on games.id = game_platforms.game_id left join game_covers on games.id = game_covers.game_id'
				let search = x.search.trim()
				let values = []

				if (x.platforms.length) { 
					
					if (search.length) {
						sql += " where (games.name ilike $1 or games.name ilike $2) "
						sql += " and game_platforms.platform_id in (SELECT unnest(string_to_array($3, ','))::int) limit $4 offset $5;"
						values = [ '%' + search + '%', search + '%', x.platforms.join(','), x.limit, x.offset ]
					}
					else {
						sql += " where game_platforms.platform_id in (SELECT unnest(string_to_array($1, ','))::int) limit $2 offset $3;"
						values = [ x.platforms.join(','), x.limit, x.offset ]
					}
				}
				else {
					if (search.length) {
						sql += ` where (games.name ilike $1 or games.name ilike $2) limit $3 offset $4; `
						values = [ '%' + search + '%', search + '%', x.limit, x.offset ]
					}
					else {
						sql += ` limit $1 offset $2; `
						values = [ x.limit, x.offset ]
					}
				}

				this.db.query(sql, values).then((res) => { resolve(res) })
			}
			catch (e) { reject(false) }
		})
	}

	async retrieve_popular_games(x: RetrieveAllGamesDto) {

		return new Promise<any>((resolve, reject) => {

			try {

				let sql = 'select distinct(games.id), games.name, game_covers.url as cover_url, games.follows from games left join game_platforms on games.id = game_platforms.game_id left join game_covers on games.id = game_covers.game_id where follows is not null '
				let search = x.search.trim()
				let values = []

				if (x.platforms.length) { 

					if (search.length) {
						sql += " and (games.name ilike $1 or games.name ilike $2) "
						sql += " and game_platforms.platform_id in (SELECT unnest(string_to_array($3, ','))::int) order by follows desc limit $4 offset $5;"
						values = [ '%' + search + '%', search + '%', x.platforms.join(','), x.limit, x.offset ]
					}
					else {
						sql += " and game_platforms.platform_id in (SELECT unnest(string_to_array($1, ','))::int) order by follows desc limit $2 offset $3;"
						values = [ x.platforms.join(','), x.limit, x.offset ]
					}
				}
				else {

					if (search.length) {
						sql += " and (games.name ilike $1 or games.name ilike $2) "
						sql += ' order by follows desc limit $3 offset $4; '
						values = [ '%' + search + '%', search + '%', x.limit, x.offset ]
					}
					else {		
						sql += ' order by follows desc limit $1 offset $2; '
						values = [ x.limit, x.offset ]
					}
				}

				this.db.query(sql, values).then((res) => { resolve(res) })
			}
			catch (e) { reject(false) }
		})
	}

	async like_unlike_game(x: LikeGameDto) {

		return new Promise<any>((resolve, reject) => {

			try {

				let sql = (x.liked) 
					? 'insert into user_games (user_id, game_id) values ($1, $2) on conflict do nothing'
					: 'delete from user_games where user_id = $1 and game_id = $2'

				let values = [ x.user_id, x.game_id ]
				this.db.query(sql, values).then((res) => { resolve(res) })
			}
			catch(e) {}
		})
	}
}
