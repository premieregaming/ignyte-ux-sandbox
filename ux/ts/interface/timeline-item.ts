export class TimelineItem {

	constructor(data: any) {

		this.id = data.id
		this.user_id = data.user_id
		this.first_name = data.first_name
		this.last_name = data.last_name
		this.profile_photo = data.profile_photo
		this.post_content = data.post_content
		this.create_timestamp = data.create_timestamp
	}

	id: string
	user_id: string
	first_name: string
	last_name: string
	profile_photo: string
	post_content: string
	create_timestamp: string
}