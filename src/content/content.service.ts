import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ContentService {

	constructor(private readonly db: DatabaseService) { }

	async getUserPosts(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	async getTimeline(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}
}
