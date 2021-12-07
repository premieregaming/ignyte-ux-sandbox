import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService, DatabaseService]
})
export class GamesModule {}
