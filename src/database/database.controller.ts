import { Controller } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {

	constructor(private readonly dataService: DatabaseService) { }

	query(sql: string, values: Array<any>) {

		return this.dataService.query(sql, values)
	}
}
