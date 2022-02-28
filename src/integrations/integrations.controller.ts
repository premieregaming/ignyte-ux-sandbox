import { Controller, Get } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsController {

	constructor(private readonly service: IntegrationsService) { }

	@Get('test')
	async test() {

		this.service.twitch_auth()
	}
	
	@Get('retrieve-genres')
	async retrieveGameGenres() {

		return this.service.retrieve_game_genres()
	}

	@Get('retrieve-games')
	async retrieveGames() {

		return this.service.retrieve_games()
	}

	@Get('retrieve-platforms')
	async retrievePlatforms() {
		
		return this.service.retrieve_game_platforms()
	}
}
