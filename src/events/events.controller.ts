import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePollDto } from './dto/poll.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {

	constructor(private readonly service: EventsService) { }

	@Get('featured/:user_id')
	async getFeaturedEvents(@Param() param): Promise<any> {

		return this.service.getFeaturedEvents(param.user_id)
	}

	@Get('ignyted/:user_id')
	async getIgnytedEvents(@Param() param): Promise<any> {

		return this.service.getIgnytedEvents(param.user_id)
	}

	@Get('trending/:user_id')
	async getTrendingEvents(@Param() param): Promise<any> {

		return this.service.getTrendingEvents(param.user_id)
	}

	@Get('all/:user_id')
	async getAllEvents(@Param() param): Promise<any> {

		return this.service.getAllEvents(param.user_id)
	}

	@Post('create/poll')
	async createPoll(@Body() data: CreatePollDto): Promise<any> {

		return this.service.createPoll(data)
	}
}
