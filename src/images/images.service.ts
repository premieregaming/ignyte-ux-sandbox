import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ImagesService {

	constructor(private readonly db: DatabaseService) {}

	async addImage() {

		throw ('not implemented')
	}
	
	async deleteImage() {
		
		throw ('not implemented')
	}
}
