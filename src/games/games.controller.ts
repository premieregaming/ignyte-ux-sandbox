import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RetrieveAllGamesDto } from './dto/retrieve-all-games.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {

	constructor(private readonly service: GamesService) {}

	@Get('user/:user_id')
	async retrieve_user_games(@Param() param) {

		return this.service.retrieve_user_games(param.user_id)
	}

	@Get('user/count/:user_id')
	async retrieve_user_game_count(@Param() param) {

		return this.service.retrieve_user_game_count(param.user_id)
	}

	@Post('all')
	async retrieve_all_games(@Body() data: RetrieveAllGamesDto) {

		return this.service.retrieve_all_games(data)
	}

	@Post('popular')
	async retrieve_popular_games(@Body() data: RetrieveAllGamesDto) {

		return this.service.retrieve_popular_games(data)
	}

	// @Get('platform')
}
