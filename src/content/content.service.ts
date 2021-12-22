import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePostDto } from './dto/create-post.dto';

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

		let sql = 'select posts.id, user_id, post_content, posts.create_timestamp, users.first_name, users.last_name, users.profile_photo from posts left join users on user_id = users.id limit 10'
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {
				resolve(res)
			})
		})
	}

	async createPost(data: CreatePostDto): Promise<any> {

		let sql = 'insert into posts (user_id, post_content) values ($1, $2) returning id'
		let values = [data.user_id, data.post_content]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {

				resolve(res[0])
			})
		})
	}
}
