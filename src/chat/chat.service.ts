import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {

	constructor(private readonly db: DatabaseService) { }

	async createChatSession(x: CreateChatDto): Promise<any> {

		let sql = 'insert into chat_sessions (user_id, friend_id) values ($1, $2) returning id'
		let values = [x.user_id, x.friend_id]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {
				if (res) return resolve(res[0])
				reject()
			})
		})
	}

	async getActiveChats(user_id: string): Promise<any> {

		let sql = 'select id, user_id, friend_id from chat_sessions where user_id = $1'
		let values = [user_id]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {
				if (res) return resolve(res)
				reject()
			})
		})
	}

	async getMessages(chat_id: string, start: string, length: string): Promise<any> {

		let sql = 'select chat_id, content, create_timestamp from chat_sessions where chat_id = $1 limit $2, $3'
		let values = [chat_id, start, length]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {
				if (res) return resolve(res)
				reject()
			})
		})
	}

	async postMessage(x: MessageDto): Promise<any> {

		let sql = 'insert into user_chat_content (chat_id, content) values ($1, $2) returning id'
		let values = [x.chat_id, x.content]

		return new Promise((resolve, reject) => {

			this.db.query(sql, values).then((res) => {
				if (res) return resolve(res[0])
				reject()
			})
		})
	}
}
