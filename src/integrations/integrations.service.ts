import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class IntegrationsService {

	constructor(private readonly db: DatabaseService, private readonly http: HttpService) {}
}
