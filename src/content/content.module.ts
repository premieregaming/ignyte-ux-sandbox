import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
	controllers: [ContentController],
	providers: [ContentService, DatabaseService]
})
export class ContentModule {}
