import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, DatabaseService]
})
export class ChatModule {}
