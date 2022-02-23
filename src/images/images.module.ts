import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ImagesService } from './images.service';

@Module({
  providers: [ImagesService, DatabaseService]
})
export class ImagesModule {}
