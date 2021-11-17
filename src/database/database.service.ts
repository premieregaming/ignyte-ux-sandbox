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

	public query(sql: string): Promise<any> {

		return new Promise((resolve, reject) => {

			this.client.query(sql, (err, res) => {

				if (err) return reject(err)
				return res.rows
			})
		})
	}
}
