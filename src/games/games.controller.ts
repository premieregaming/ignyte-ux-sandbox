import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {

	constructor(private readonly service: GamesService) {}

	@Get('user/:user_id')
	async retrieve_user_games(@Param() user_id) {

		return this.service.retrieve_user_games(user_id)
	}

	@Get('user/count/:user_id')
	async retrieve_user_game_count(@Param() user_id) {

		return this.service.retrieve_user_game_count(user_id)
	}

	@Get('all/:offset')
	async retrieve_all_games(@Param() offset) {

		return this.service.retrieve_all_games(offset)
	}
}
