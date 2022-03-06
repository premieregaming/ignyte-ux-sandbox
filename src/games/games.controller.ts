import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LikeGameDto } from './dto/like-game.dto';
import { RetrieveAllGamesDto } from './dto/retrieve-all-games.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {

	constructor(private readonly service: GamesService) {}

	@Post('user/count')
	async retrieve_user_game_count(@Body() data: RetrieveAllGamesDto) {

		return this.service.retrieve_user_game_count(data)
	}

	@Post('user')
	async retrieve_user_games(@Body() data: RetrieveAllGamesDto) {

		return this.service.retrieve_user_games(data)
	}

	@Post('all')
	async retrieve_all_games(@Body() data: RetrieveAllGamesDto) {

		return this.service.retrieve_all_games(data)
	}

	@Post('popular')
	async retrieve_popular_games(@Body() data: RetrieveAllGamesDto) {

		return this.service.retrieve_popular_games(data)
	}

	@Post('like-game')
	async like_unlike_game(@Body() data: LikeGameDto) {

		return this.service.like_unlike_game(data)
	}

	// @Get('platform')
}
