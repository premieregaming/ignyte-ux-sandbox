import { Module } from '@nestjs/common';
import { NewsService } from '../news/news.service';
import { DatabaseService } from '../database/database.service';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
	controllers: [ContentController],
	providers: [ContentService, DatabaseService, NewsService]
})
export class ContentModule {}
