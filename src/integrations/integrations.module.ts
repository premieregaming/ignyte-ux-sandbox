import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { IgdbService } from './igdb/igdb.service';
import { TwitchService } from './twitch/twitch.service';

@Module({
  imports: [HttpModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, DatabaseService, IgdbService, TwitchService]
})
export class IntegrationsModule {}
