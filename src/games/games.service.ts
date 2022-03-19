import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LikeGameDto } from './dto/like-game.dto';
import { RetrieveAllGamesDto } from './dto/retrieve-all-games.dto';


class ParamGen {

	private i: number = 1
	get next() { this.i++; return '$' + (this.i - 1).toString() }
}
class JoinGen {

	private tripped = true
	get next() {
		let is_where = this.tripped
		this.tripped = false
		return (is_where ? ' where ' : ' and ')
	}
}

@Injectable()
export class GamesService {0

	constructor(private readonly db: DatabaseService) {}

	async retrieve_user_game_count(x: RetrieveAllGamesDto): Promise<any> {

		return new Promise<any>((resolve, reject) => {

			try {

				if (!x.user_id) { return resolve(0) }

				let sql = 'select count(games.id) from games left join user_games on games.id = user_games.game_id where user_games.user_id = $1'
				let values = [ x.user_id ]
				this.db.query(sql, values).then((res) => { resolve(res[0]['count']) })
			}
			catch (e) { reject(false) }
		})
	}

	async retrieve_user_games(x: RetrieveAllGamesDto): Promise<any> {

		return new Promise<any>((resolve, reject) => {

			try {

				if (!x.user_id) { return resolve([]) }

				let sql = 'select games.id, games.name, game_covers.url as cover_url'
				sql += ' from games inner join lateral ( select game_id from game_platforms where games.id = game_platforms.game_id limit 1) as ltr on true '
				sql += ' left join game_covers on games.id = game_covers.game_id'
				sql += ' left join user_games on games.id = user_games.game_id where user_games.user_id = $1'
				sql += " limit $2 offset $3; "

				let values = [ x.user_id, x.limit, x.offset ]
				this.db.query(sql, values).then((res) => { resolve(res) })
			}
			catch (e) { reject(false) }
		})
	}

	async retrieve_all_games(x: RetrieveAllGamesDto) {

		return new Promise<any>((resolve, reject) => {

			try {

				let p = new ParamGen()
				let j = new JoinGen()
				let values = []

				let sql = 'select games.id, games.name, game_covers.url as cover_url '
				if (x.user_id) { 
					sql += ', exists ( select game_id from user_games where user_games.game_id = games.id and user_games.user_id = ' + p.next + ' ) as liked'
					values.push(x.user_id)
				}
				
				sql += ' from games left join game_covers on games.id = game_covers.game_id ' 
				if (x.platforms.length) {
					sql += "inner join lateral ( select game_id from game_platforms where games.id = game_platforms.game_id and game_platforms.platform_id in (SELECT unnest(string_to_array(" + p.next + ", ','))::int) limit 1) as ltr on true " 
					values.push(x.platforms.join(','))
				}
					
				// if (search.length) {
				// 	sql += j.next + "(games.name ilike " + p.next + " or games.name ilike " + p.next + ") "
				// 	values = values.concat([ '%' + search + '%', search + '%' ])
				// }
	
				sql += " limit " + p.next + " offset " + p.next + "; "
				values = values.concat([x.limit, x.offset])

				this.db.query(sql, values).then((res) => { resolve(res) })
			}
			catch (e) { reject(false) }
		})
	}

	async retrieve_popular_games(x: RetrieveAllGamesDto) {

		return new Promise<any>((resolve, reject) => {

			try {

				let p = new ParamGen()
				let j = new JoinGen()
				let values = []

				let sql = 'select games.id, games.name, game_covers.url as cover_url, games.follows '

				if (x.user_id) {
					sql += ", exists ( select game_id from user_games where user_games.game_id = games.id and user_games.user_id = " + p.next + " ) as liked"
					values.push(x.user_id)
				}

				sql += " from games left join game_covers on games.id = game_covers.game_id " 
				if (x.platforms.length) { 
					sql += "inner join lateral ( select game_id from game_platforms where games.id = game_platforms.game_id and game_platforms.platform_id in (SELECT unnest(string_to_array(" + p.next + ", ','))::int) limit 1) as ltr on true " 
					values.push(x.platforms.join(','))
				}

				// if (search.length) {
				// 	sql += j.next + "(games.name ilike " + p.next + " or games.name ilike " + p.next + ") "
				// 	values = values.concat(['%' + search + '%', search + '%'])
				// }

				sql += j.next + " follows is not null order by follows desc limit " + p.next + " offset " + p.next + "; "
				values = values.concat([x.limit, x.offset])
				
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

	async search_games(x: RetrieveAllGamesDto) {

		return new Promise<any>((resolve, reject) => {

			try {

				let p = new ParamGen()
				let j = new JoinGen()
				let search = x.search.trim()
				let values = []

				let sql = 'select games.id, games.name, game_covers.url as cover_url '
				if (x.user_id) {
					sql += ', exists ( select game_id from user_games where user_games.game_id = games.id and user_games.user_id = ' + p.next + ' ) as liked'
					values.push(x.user_id)
				}

				sql += ' from games left join game_covers on games.id = game_covers.game_id '
				if (x.platforms.length) {
					sql += "inner join lateral ( select game_id from game_platforms where games.id = game_platforms.game_id and game_platforms.platform_id in (SELECT unnest(string_to_array(" + p.next + ", ','))::int) limit 1) as ltr on true "
					values.push(x.platforms.join(','))
				}

				if (search.length) {
					sql += j.next + "(games.name ilike " + p.next + " or games.name ilike " + p.next + ") "
					values = values.concat(['%' + search + '%', search + '%'])
				}
			
				sql += " limit " + p.next + " offset " + p.next + "; "
				values = values.concat([x.limit, x.offset])

				this.db.query(sql, values).then((res) => { resolve(res) })
			}
			catch(e) { reject(false) }
		})
	}
}
