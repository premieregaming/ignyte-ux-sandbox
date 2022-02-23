import { Controller, Get, Param, Post } from '@nestjs/common';
import { XpService } from './xp.service';

@Controller('xp')
export class XpController {

	constructor(private readonly service: XpService) {}

	@Post('event/:user_id/:event_type')
	async addUserXpEvent(@Param() param) {

		return this.service.addUserXpEvent(param.user_id, param.event_type)
	}

	@Get('userxp/:user_id')
	async getUserXp(@Param() param) {

		return this.service.getUserXp(param.user_id)
	}
}
