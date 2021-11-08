import { Net } from "./sdk/net.js";

class SimpleProfileInterface {

	constructor (name: String, image_url: String) {

	}

	name: String;
	image_url: String;
}

export class Auth {

	static get is_authenticated() { return false }
	static creds: {}

	static on_sign_in_google(user) {

		var profile = user.getBasicProfile()
		let token = user.getAuthResponse().id_token

		Net.post('api/auth/google-token', { "idtoken": token }).then((response) => {
			debugger
		})

		console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName())
		console.log('Image URL: ' + profile.getImageUrl())
		console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
	}
}
