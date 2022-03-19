import { Account } from "./account.js";
import { Ignyte } from "./ignyte.js";
import { Net } from "./sdk/net.js";

class SimpleProfileInterface {

	constructor(name: String, image_url: String) {

	}

	name: String;
	image_url: String;
}

class GoogleAuthData {

	constructor(profile) {

		this.id = profile.getId()
		this.email = profile.getEmail()
		this.first_name = profile.getGivenName()
		this.last_name = profile.getFamilyName()
		this.profile_photo = profile.getImageUrl()
	}

	id: String;
	first_name: String;
	last_name: String;
	profile_photo: String;
	email: String;
}

export class Auth {

	static get is_authenticated() { return Auth.authenticated_user_id != null }
	static authenticated_user_id = null;
	static creds: {}

	static on_auth_listeners: Array<Function> = []

	static on_auth() { Auth.on_auth_listeners.forEach((x) => x() )}

	static on_sign_in_google(user) {

		var profile = user.getBasicProfile()
		let token = user.getAuthResponse().id_token
		let id = profile.getId()

		Net.post('api/auth/google-token', { "idtoken": token }).then((verified_id) => {

			if (id != verified_id) { return false }

			let auth_data = new GoogleAuthData(profile);
			Auth.auth_with_google(auth_data)

			console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
			console.log('Name: ' + profile.getName())
			console.log('Image URL: ' + profile.getImageUrl())
			console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
		})
	}

	static auth_with_google(data: GoogleAuthData) {

		Net.post('api/auth/google-auth', data).then((response) => {

			if (response) { 
				Auth.authenticated_user_id = response
				Account.get_account();
				Auth.on_auth()
			}
		})
	}

	// static init_unauthenticated() { Auth.on_auth() }
}
