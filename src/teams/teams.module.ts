import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, DatabaseService]
})
export class TeamsModule {}
