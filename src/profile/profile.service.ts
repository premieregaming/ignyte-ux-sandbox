import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EducationDto } from './dto/education.dto';

@Injectable()
export class ProfileService {

	constructor(private readonly db: DatabaseService) { }

	async getProfilePic(id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => { 

			})
		})
	}

	async uploadProfilePic() {

		
	}

	async getWallpaper(id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => { 

			})
		})
	}

	async uploadWallpaper() {

	}

	async getPosts(id: string, start: string, length: string): Promise<any> {

		let sql = 'select * from posts where user_id = $1 limit $2, $3'
		let values = [id, start, length]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {

			})
		})
	}

	async getBio(id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {

			})
		})
	}

	async getPlatforms(id: string, start: string, length: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {

			})
		})
	}

	async getDevices(id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {

			})
		})
	}

	async getEducation(id: string): Promise<Array<any>> {

		let sql = 'select id, user_id, school_type, school_name, degree, classyear from user_education where user_id = $1'
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {

				if (res) return resolve(res)
				reject()
			})
		})
	}

	async postEducation(data: EducationDto): Promise<any> {

		let sql = 'insert into user_education (user_id, school_type, school_name, degree, classyear) values ($1, $2, $3, $4, $5) returning id'
		let values = [data.user_id, data.school_type, data.school_name, data.degree, data.classyear]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {
				if (res) return resolve(res[0])
				reject()
			})
		})
	}

	async deleteEducation(id: string): Promise<boolean> {

		let sql = 'delete from user_education where user_id = $1'
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {
				if (res) return resolve(true)
				reject()
			})
		})
	}

	async getSkills(id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {

			})
		})
	}

	async getPhotos(id: string, start: string, length: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {

			})
		})
	}

	async exportCV(id: string) {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {

			})
		})
	}

	async getFriends(id: string): Promise<Array<any>> {

		let sql = 'select user_id, friend_id, is_accepted from friends where user_id = $1'
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id]).then((res) => {

				if (res) return resolve(res)
				reject()
			})
		})
	}

	async requestFriend(id: string, friend_id: string): Promise<any> {

		let sql = 'insert into friends (user_id, friend_id) values ($1, $2)'
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id, friend_id]).then((res) => {

				if (res) return resolve(res)
				reject()
			})
		})
	}

	async followUser(id: string, follow_id: string): Promise<any> {
		
		let sql = 'insert into friends (user_id, friend_id) values ($1, $2)'
		return new Promise((resolve, reject) => {

			this.db.query(sql, [id, follow_id]).then((res) => {

				if (res) return resolve(res)
				reject()
			})
		})
	}

	async getBankTotal(): Promise<any> {

	}

	async addFunds(): Promise<any> {

	}

	async transferFunds(): Promise<any> {
		
	}
}
