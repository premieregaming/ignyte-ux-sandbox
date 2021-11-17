import { Injectable } from '@nestjs/common';
import { Client } from 'pg'

@Injectable()
export class DatabaseService {

	client: Client

	constructor() {

		this.client = new Client({
			connectionString: process.env.DATABASE_URL,
			// ssl: { rejectUnauthorized: false }
		});

		this.client.connect();
	}

	public query(sql: string, values: Array<any>): Promise<any> {

		return new Promise((resolve, reject) => {

			try {
				this.client.query(sql, values, (err, res) => {

					if (err) return reject(err)
					resolve(res.rows)
				})
			}
			catch (e) {
				reject(e)
			}
		})
	}
}
