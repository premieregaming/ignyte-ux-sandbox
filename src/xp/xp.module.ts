import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { XpService } from './xp.service';

@Module({
  providers: [XpService, DatabaseService]
})
export class XpModule {}
