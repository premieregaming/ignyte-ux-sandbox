import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, DatabaseService]
})
export class ProfileModule {

}
