import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class NewsService {

	constructor(private readonly db: DatabaseService) { }

	getFeaturedNews(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	getIgnytedNews(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	getTrendingNews(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	getAllNews(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}
}
