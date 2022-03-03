import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { TwitchService } from '../twitch/twitch.service';
import { map } from 'rxjs';

@Injectable()
export class IgdbService {

	private igdb_url = process.env.igdb_url

	constructor(
		private readonly db: DatabaseService, 
		private readonly http: HttpService, 
		private readonly twitch: TwitchService) { }

	async retrieve_game_genres(): Promise<any> {

		try {
			let url = this.igdb_url + '/genres'
			let body = "fields checksum,created_at,name,slug,updated_at,url; limit 200;"
			let config = { method: 'POST', url: url, headers: this.twitch.headers, data: body }
			let response = this.http.request(<any>config)
			let data = response.pipe(map((res) => res.data))

			data.subscribe((x: Array<any>) => {
				x.forEach(this.add_genre.bind(this))
			}, (error) => { console.log(error) })
		}
		catch (e) { console.log(e) }
	}

	async add_genre(x) {

		let sql = 'insert into game_genres (id, name, slug, url) values ($1, $2, $3, $4)'
		let values = [x.id, x.name, x.slug, x.url]
		await this.db.query(sql, values)
	}

	async retrieve_games(): Promise<any> {

		let offset = 0
		let complete = false

		while (!complete) {

			try {
				await this.retrieve_game_data_chunk(offset)
				offset += 100
			}
			catch (e) { complete = true }
		}
	}

	async retrieve_game_data_chunk(offset) {

		return new Promise(((resolve, reject) => {

			try {
				let url = this.igdb_url + '/games'
				let body = 'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;'
				body += 'offset ' + offset.toString() + ';'
				body += 'limit 100;'

				let config = { method: 'POST', url: url, headers: this.twitch.headers, data: body }
				let response = this.http.request(<any>config)
				let data = response.pipe(map((res) => res.data))

				data.subscribe(((x: Array<any>) => {
					console.log("response size: " + x.length)
					this.process_games(x).then(() => resolve(true))
				}).bind(this), (error) => { console.log(error) })
			}
			catch (e) {
				console.log(e)
				reject(false)
			}
		}).bind(this))
	}

	async process_games(x): Promise<any> {

		return new Promise((async function (resolve, reject) {

			for (var i = 0, ii = x.length; i != ii; ++i) {

				console.log('adding game' + x[i].name)
				await this.add_game(x[i])
			}

			resolve(true)
		}).bind(this))
	}

	async add_game(x): Promise<any> {

		let sql = 'insert into games (id, age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites) '
		sql += 'values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55)'

		let values = [x.id, x.age_ratings, x.aggregated_rating, x.aggregated_rating_count, x.alternative_names, x.artworks, x.bundles, x.category, x.checksum, x.collection, x.cover, x.created_at, x.dlcs, x.expanded_games, x.expansions, x.external_games, x.first_release_date, x.follows, x.forks, x.franchise, x.franchises, x.game_engines, x.game_modes, x.genres, x.hypes, x.involved_companies, x.keywords, x.multiplayer_modes, x.name, x.parent_game, x.platforms, x.player_perspectives, x.ports, x.rating, x.rating_count, x.release_dates, x.remakes, x.remasters, x.screenshots, x.similar_games, x.slug, x.standalone_expansions, x.status, x.storyline, x.summary, x.tags, x.themes, x.total_rating, x.total_rating_count, x.updated_at, x.url, x.version_parent, x.version_title, x.videos, x.websites]
		return await this.db.query(sql, values)
	}

	async retrieve_game_platforms() {

		return new Promise(((resolve, reject) => {

			try {
				let url = this.igdb_url + '/platforms'
				let body = 'fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites;limit 200;'
				let config = { method: 'POST', url: url, headers: this.twitch.headers, data: body }
				let response = this.http.request(<any>config)
				let data = response.pipe(map((res) => res.data))

				data.subscribe(((x: Array<any>) => {
					x.forEach((y) => this.add_game_platform(y))
					resolve(true)
				}).bind(this), (error) => { console.log(error) })
			}
			catch (e) {
				console.log(e)
				reject(false)
			}
		}).bind(this))
	}

	private async add_game_platform(x): Promise<any> {

		let sql = 'insert into platforms (id,abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites) '
		sql += 'values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)'

		let values = [x.id, x.abbreviation, x.alternative_name, x.category, x.checksum, x.created_at, x.generation, x.name, x.platform_family, x.platform_logo, x.slug, x.summary, x.updated_at, x.url, x.versions, x.websites]
		return await this.db.query(sql, values)
	}

	async retrieve_game_covers() {

		let sql = 'select count(*) from game_covers'
		let count = parseInt(await this.db.query(sql, []).then((res) => res[0]['count']))

		let offset = count;
		let complete = false

		while (!complete) {

			try {
				await this.retrieve_game_cover_chunk(offset)
				offset += 100
			}
			catch (e) { complete = true }
		}
	}

	private async retrieve_game_cover_chunk(offset) {

		return new Promise(((resolve, reject) => {

			try {
				let url = this.igdb_url + '/covers'
				let body = 'fields alpha_channel,animated,checksum,game,height,image_id,url,width;'
				body += 'offset ' + offset.toString() + ';'
				body += 'limit 100;'

				let config = { method: 'POST', url: url, headers: this.twitch.headers, data: body }
				let response = this.http.request(<any>config)
				let data = response.pipe(map((res) => res.data))

				data.subscribe(((x: Array<any>) => {
					x.forEach(async (y) => await this.add_game_cover(y))
					resolve(true)
				}).bind(this), (error) => { console.log(error) })
			}
			catch (e) {
				console.log(e)
				reject(false)
			}
		}).bind(this))
	}

	private async add_game_cover(x): Promise<any> {

		let sql = 'insert into game_covers (id,game_id,alpha_channel,animated,checksum,height,width,url,image_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
		let values = [ x.id, x.game, x.hasOwnProperty('alpha_channel') && x.alpha_channel, x.hasOwnProperty('animated') && x.animated, x.checksum, x.height, x.width, x.url, x.image_id ]
		return await this.db.query(sql, values)
	}

	async process_platforms(): Promise<any> {

		let offset = 0
		let complete = false

		while (!complete) {

			try {
				await this.process_platform_chunk(offset)
				offset += 100
			}
			catch (e) { complete = true }
		}
	}

	async process_platform_chunk(offset) {

		let sql = 'select id, platforms from games offset $1 limit 100'
		return this.db.query(sql, [offset]).then(async (res) => await res.forEach(async (x) => await this.process_platform_game(x)))
	}

	async process_platform_game(x) {

		if (x.platforms == null) return

		let platforms: Array<number> = JSON.parse(x.platforms.replace('{', '[').replace('}', ']'))
		platforms.forEach(async (platform_id) => {
			
			let sql = 'insert into game_platforms (game_id, platform_id) values ($1, $2)'
			await this.db.query(sql, [x.id, platform_id])
		})
	}
}
