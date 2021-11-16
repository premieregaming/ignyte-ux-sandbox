class SimpleProfileInterface {

	constructor (name: String, image_url: String) {

	}

	name: String;
	image_url: String;
}

export class Auth {

	static get is_authenticated() { return false }
	static creds: {}
}
