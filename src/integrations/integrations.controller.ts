import { Controller, Get } from '@nestjs/common';
import { IgdbService } from './igdb/igdb.service';
import { TwitchService } from './twitch/twitch.service';
import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsController {

	constructor(private readonly igdb: IgdbService, private readonly twitch: TwitchService) {}

	@Get('test')
	async test() {

		this.twitch.auth()
	}
	
	@Get('retrieve-genres')
	async retrieveGameGenres() {

		return this.igdb.retrieve_game_genres()
	}

	@Get('retrieve-games')
	async retrieveGames() {

		return this.igdb.retrieve_games()
	}

	@Get('retrieve-platforms')
	async retrievePlatforms() {
		
		return this.igdb.retrieve_game_platforms()
	}

	@Get('retrieve-covers')
	async retrieveCovers() {
		
		return this.igdb.retrieve_game_covers()
	}

	@Get('process-platforms')
	async processPlatforms() {

		return this.igdb.process_platforms()
	}
}
