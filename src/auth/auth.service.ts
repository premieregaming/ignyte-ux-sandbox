import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthDto, GoogleTokenVerifyDto } from './dto/google-auth.dto';
@Injectable()
export class AuthService {

	static google_client_id = '1048890093326-a8kisu4dulmt0hu5606s9r0hhs4847ci.apps.googleusercontent.com'
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

	async googleAuth(auth: GoogleAuthDto) {

		debugger
	}
}
