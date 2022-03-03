import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

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

	async retrieve_all_games(offset: string) {

		return new Promise<any>((resolve, reject) => {

			try {
				let sql = 'select id, name, category from games limit 12 offset $1'
				this.db.query(sql, [offset]).then((res) => { resolve(res[0]['count']) })
			}
			catch (e) { reject(false) }
		})
	}
}
