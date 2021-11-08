import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {

	static google_client_id = '1014812002971-lj7hlbferq8qarbc7922po6q6grrrvrk.apps.googleusercontent.com'
	static client = new OAuth2Client(AuthService.google_client_id);

	async googleTokenAuth(token: string) {
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
}
