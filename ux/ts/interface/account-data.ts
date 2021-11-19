
export class AccountData {

	constructor(data: any) {

		this.id = data.id;
		this.email = data.email
		this.first_name = data.first_name
		this.last_name = data.last_name
		this.google_account_id = data.google_account_id
		this.fb_account_id = data.fb_account_id
		this.profile_photo = data.profile_photo
		this.create_timestamp = data.create_timestamp
	}
	
	id: string
	email: string
	first_name: string
	last_name: string
	google_account_id: string
	fb_account_id: string
	profile_photo: string
	create_timestamp: string
}