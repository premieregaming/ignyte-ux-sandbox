import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthDto, GoogleTokenVerifyDto } from './dto/google-auth.dto';
import { DatabaseService } from '../database/database.service';
import { AccountService } from '../account/account.service'
@Injectable()
export class AuthService {

	constructor(private readonly database: DatabaseService, private readonly account: AccountService) {}

	static google_client_id = '1048890093326-t45u8sprcpi769c130kv8uchh0mked39.apps.googleusercontent.com'
	static client = new OAuth2Client(AuthService.google_client_id);

	async googleTokenVerify(token: string) {

		try {
			const ticket = await AuthService.client.verifyIdToken({
				idToken: token,
				audience: AuthService.google_client_id,  // Specify the CLIENT_ID of the app that accesses the backend
				// Or, if multiple clients access the backend:
				//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
			});
			const payload = ticket.getPayload();
			const userid = payload['sub'];
			return userid;
		}
		catch (e) {
			debugger;
		}
	}

	async googleAuth(data: GoogleAuthDto) {

		return new Promise((resolve, reject) => {

			try {
				let sql = 'select user_id from google_user_accounts where google_id = $1'
				this.database.query(sql, [data.id]).then((res) => {

					console.log(res)

					if (res.length == 0) { this.account.create_google_acct(data).then((res) => resolve(res)) }
					else { 
						
						resolve(res[0].user_id) 
					}
				})
			}
			catch (e) {
				console.log(e)
				return false;
			}
		})
	}
}
