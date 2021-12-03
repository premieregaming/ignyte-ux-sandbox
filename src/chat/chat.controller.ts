import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageDto } from './dto/message.dto';

@Controller('chat')
export class ChatController {

	constructor(private readonly service: ChatService) { }

	@Post('create')
	async createChatSession(@Body() data: CreateChatDto): Promise<any> {

		return this.service.createChatSession(data)
	}

	@Get('sessions/:user_id')
	async getUserChats(@Param() param): Promise<any> {

		return this.service.getActiveChats(param.user_id)
	}

	@Get('messages/:chat_id/:start/:length')
	async getMessages(@Param() param): Promise<any> {

		return this.service.getMessages(param.chat_id, param.start, param.length)
	}

	@Post('messages')
	async postMessage(@Body() data: MessageDto): Promise<any> {

		return this.service.postMessage(data)
	}
}
