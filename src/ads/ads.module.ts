import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';

@Module({
  controllers: [AdsController],
  providers: [AdsService, DatabaseService]
})
export class AdsModule {}
