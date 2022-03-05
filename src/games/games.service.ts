import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RetrieveAllGamesDto } from './dto/retrieve-all-games.dto';

@Injectable()
export class GamesService {

	constructor(private readonly db: DatabaseService) {}

	async retrieve_user_games(user_id: string): Promise<any> {


	}

	async retrieve_user_game_count(user_id: string): Promise<any> {

		return new Promise<any>((resolve, reject) => {

			try {
				let sql = 'select count(*) from user_games where user_id = $1'
				this.db.query(sql, [user_id]).then((res) => { resolve(res[0]['count']) })
			}
			catch(e) { reject(false) }
		})
	}

	async search_games() {

		
	}

	async retrieve_all_games(x: RetrieveAllGamesDto) {

		return new Promise<any>((resolve, reject) => {

			try {

				let sql = 'select distinct(games.id), games.name, game_covers.url as cover_url from games left join game_platforms on games.id = game_platforms.game_id left join game_covers on games.id = game_covers.game_id'
				let values = []

				if (x.platforms.length) { 
					sql += " where game_platforms.platform_id in (SELECT unnest(string_to_array($1, ','))::int) limit $2 offset $3;"
					values = [ x.platforms.join(','), x.limit, x.offset ]
				}
				else {
					sql += ` limit $1 offset $2; `
					values = [ x.limit, x.offset ]
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
				let values = []

				if (x.platforms.length) { 

					sql += " and game_platforms.platform_id in (SELECT unnest(string_to_array($1, ','))::int) order by follows desc limit $2 offset $3;"
					values = [ x.platforms.join(','), x.limit, x.offset]
				}
				else {
					sql += ' order by follows desc limit $1 offset $2; '
					values = [x.limit, x.offset]
				}
				

				this.db.query(sql, values).then((res) => { resolve(res) })
			}
			catch (e) { reject(false) }
		})
	}
}
