import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, DatabaseService]
})
export class EventsModule {}