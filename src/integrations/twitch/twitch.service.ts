import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { map } from 'rxjs';

@Injectable()
export class TwitchService {

	public get is_auth() { return this.token.access_token != null }

	public get headers() {

		return {
			'Accept': 'application/json',
			'Client-ID': this.config.client_id,
			'Authorization': 'Bearer ' + this.token.access_token
		}
	}

	private config = {
		client_id: process.env.TWITCH_CLIENT_ID,
		client_secret: process.env.TWITCH_APP_ACCESS_TOKEN,
		grant_type: 'client_credentials'
	}

	private token = { access_token: null, expires_in: null, token_type: null }

	constructor(private readonly db: DatabaseService, private readonly http: HttpService) { this.auth() }

	async auth(): Promise<any> {

		return new Promise((resolve, reject) => {

			try {
				let url = process.env.twitch_url
				url += '?client_id=' + this.config.client_id
				url += '&client_secret=' + this.config.client_secret
				url += '&grant_type=' + this.config.grant_type

				let response = this.http.post(url)
				let data = response.pipe(map((res) => res.data))

				data.subscribe((value) => {

					this.token.access_token = value.access_token
					this.token.expires_in = value.expires_in
					this.token.token_type = value.token_type
					resolve(true)
				})
			}
			catch (e) { }
		})
	}
}
