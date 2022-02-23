import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { map } from 'rxjs';
import { igdb } from 'igdb-api-node'

@Injectable()
export class IntegrationsService {

	private twitch_token = { access_token: null, expires_in: null, token_type: null }
	private get twitch_is_auth() { return this.twitch_token.access_token != null }

	private twitch_params = {
		client_id: process.env.TWITCH_CLIENT_ID,
		client_secret: process.env.TWITCH_APP_ACCESS_TOKEN,
		grant_type: 'client_credentials'
	}

	private get twitch_headers() {

		return {
			'Accept': 'application/json',
			'Client-ID': this.twitch_params.client_id,
			'Authorization': 'Bearer ' + this.twitch_token.access_token
		} 
	}
	
	private igdb_url = process.env.igdb_url
	// private igdb_client = igdb()

	constructor(private readonly db: DatabaseService, private readonly http: HttpService) {}

	async twitch_auth(): Promise<any> {
		
		return new Promise((resolve, reject) => {

			try {
				let url = process.env.twitch_url
				url += '?client_id=' + this.twitch_params.client_id
				url += '&client_secret=' + this.twitch_params.client_secret
				url += '&grant_type=' + this.twitch_params.grant_type

				let response = this.http.post(url)
				let data = response.pipe(map((res) => res.data))

				data.subscribe((value) => {

					this.twitch_token.access_token = value.access_token
					this.twitch_token.expires_in = value.expires_in
					this.twitch_token.token_type = value.token_type
					resolve(true)
				})
			}
			catch(e) { }
		})
	}

	async retrieve_game_genres(): Promise<any> {

		if (!this.twitch_is_auth) { await this.twitch_auth() }
	
		try {
			let url = this.igdb_url + '/genres'
			let body = "fields checksum,created_at,name,slug,updated_at,url;"
			let config = { method: 'POST', url: url, headers: this.twitch_headers, data: body }
			let response = this.http.request(<any>config)
			let data = response.pipe(map((res) => res.data))

			data.subscribe((x: Array<any>) => { 
				x.forEach(this.add_genre.bind(this))
			}, (error) => { console.log(error) })
		}
		catch(e) {
			console.log(e)
		}
	}

	async add_genre(x) {

		let sql = 'insert into game_genres (id, name, slug, url) values ($1, $2, $3, $4)'
		let values = [x.id, x.name, x.slug, x.url]
		await this.db.query(sql, values)
	}

	async retrieve_games(): Promise<any> {

		if (!this.twitch_is_auth) { await this.twitch_auth() }

		let complete = false
		let offset = 0

		while (!complete) {

			await this.retrieve_game_data_chunk(offset)
			offset += 100
		}
	}

	async retrieve_game_data_chunk(offset) {

		return new Promise((resolve, reject) => {

			try {
				let url = this.igdb_url + '/games'
				let body = 'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;'
				body += 'offset ' + offset.toString() + ';'
				body += 'limit 100;'

				let config = { method: 'POST', url: url, headers: this.twitch_headers, data: body }
				let response = this.http.request(<any>config)
				let data = response.pipe(map((res) => res.data))

				data.subscribe((x: Array<any>) => {

					console.log("response size: " + x.length)

					this.process_games(x).then(() => resolve(true))
				
				}, (error) => { console.log(error) })
			}
			catch (e) {
				console.log(e)
				reject(false)
			}
		})
	}

	async process_games(x): Promise<any> {

		return new Promise((resolve, reject) => async function() {
			
			for (var i in x) {
				console.log('adding game' + x[i].name)
				await this.add_game(x[i])
			}

			resolve(this)
		})
	
		// x.forEach(this.add_game.bind(this))
	}

	async add_game(x): Promise<any> {

		let sql = 'insert into games (id, age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites) '
		sql += 'values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55)'

		let values = [ x.id, x.age_ratings, x.aggregated_rating, x.aggregated_rating_count, x.alternative_names, x.artworks, x.bundles, x.category, x.checksum, x.collection, x.cover, x.created_at, x.dlcs, x.expanded_games, x.expansions, x.external_games, x.first_release_date, x.follows, x.forks, x.franchise, x.franchises, x.game_engines, x.game_modes, x.genres, x.hypes, x.involved_companies, x.keywords, x.multiplayer_modes, x.name, x.parent_game, x.platforms, x.player_perspectives, x.ports, x.rating, x.rating_count, x.release_dates, x.remakes, x.remasters, x.screenshots, x.similar_games, x.slug, x.standalone_expansions, x.status, x.storyline, x.summary, x.tags, x.themes, x.total_rating, x.total_rating_count, x.updated_at, x.url, x.version_parent, x.version_title, x.videos, x.websites ]
		await this.db.query(sql, values)
	}
}
