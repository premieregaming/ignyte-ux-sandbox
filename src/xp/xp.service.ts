import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class XpService {

	constructor(private readonly db: DatabaseService) {}

	async getUserXp(user_id: String) {

		let sql = 'select level, xp from user_xp where user_id = ?'
		return new Promise((resolve, reject) => {

			this.db.query(sql, [user_id]).then((res) => {
				if (res.length == 0) reject(res)
				resolve(res[0])
			})
		})
	}

	async addUserXpEvent(user_id: string, event_type: number) {

		let sql = 'insert into xp_event (user_id, event_type) values (?, ?)'
		return new Promise((resolve, reject) => {

			this.db.query(sql, [user_id, event_type]).then((res) => { resolve(res[0]) })
		})
	}
}
