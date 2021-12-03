import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, DatabaseService]
})
export class NewsModule {}
