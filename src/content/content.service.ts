import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ContentService {

	constructor(private readonly db: DatabaseService) { }

	getUserPosts(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	getTimeline(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}
}
