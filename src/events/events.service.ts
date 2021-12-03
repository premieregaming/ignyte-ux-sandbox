import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateFundraiserDto } from './dto/fundraiser.dto';
import { CreateGiveawayDto } from './dto/giveaway.dto';
import { CreatePollDto } from './dto/poll.dto';

@Injectable()
export class EventsService {
	
	constructor(private readonly db: DatabaseService) { }

	async getFeaturedEvents(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	async getIgnytedEvents(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	async getTrendingEvents(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	async getAllEvents(user_id: string): Promise<any> {

		let sql = ''
		return new Promise((resolve, reject) => {

			this.db.query(sql, []).then((res) => {

			})
		})
	}

	async createPoll(x: CreatePollDto): Promise<any> {

		let sql = 'insert into polls (user_id, content, option1, option2, option3, option4, option5) values ($1, $2, $3, $4, $5, $6, $7) returning id'
		let values = [x.user_id, x.content, x.option1, x.option2, x.option3, x.option4, x.option5]
		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {

				if (res) return resolve(res[0])
				reject()
			})
		})
	}

	async createGiveaway(x: CreateGiveawayDto): Promise<any> {

		let sql = 'insert into giveaways (user_id, currency_amount, is_finished, start_time, end_time) values ($1, $2, $3, $4, $5) returning id'
		let values = [x.user_id, x.currency_amount, x.is_finished, x.start_time, x.end_time]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {
				
				if (res) return resolve(res[0])
				reject()
			})
		})
	}

	async createFundraiser(x: CreateFundraiserDto): Promise<any> {

		let sql = 'insert into fundraisers (user_id, goal_amount, start_time, end_time) values ($1, $2, $3, $4) returning id'
		let values = [x.user_id, x.goal_amount, x.start_time, x.end_time]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {

				if (res) return resolve(res[0])
				reject()
			})
		})
	}
}
