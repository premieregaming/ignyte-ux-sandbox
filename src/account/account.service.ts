import { Injectable } from '@nestjs/common';
import { GoogleAuthDto } from '../auth/dto/google-auth.dto';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class AccountService {

	constructor(private readonly db: DatabaseService) { }
	
	async create_google_acct(g_user: GoogleAuthDto): Promise<any> {

		let user_sql = 'insert into users (email, first_name, last_name, google_account_id, profile_photo) values ($1, $2, $3, $4, $5) returning id'
		let google_sql = 'insert into google_user_accounts (user_id, google_id, email, first_name, last_name, profile_photo) values ($1, $2, $3, $4, $5, $6)'
		let user_values = [g_user.email, g_user.first_name, g_user.last_name, g_user.id, g_user.profile_photo]

		return new Promise((resolve, reject) => {

			this.db.query(user_sql, user_values).then((res) => {

				let id = res[0].id
				let google_values = [id, g_user.id, g_user.email, g_user.first_name, g_user.last_name, g_user.profile_photo]
				this.db.query(google_sql, google_values).then((res) => { resolve(id) })
			})
		})
	}

	async get_account_data(id: string): Promise<any> {

		let sql = 'select id, email, first_name, last_name, profile_photo, google_account_id, fb_account_id, create_timestamp from users where id = $1'
		let values = [id]
		
		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => { resolve(res[0]) })
		})
	}
}
