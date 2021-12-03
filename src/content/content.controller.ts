import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewsService } from '../news/news.service';

@Controller('content')
export class ContentController {

	constructor(private readonly service: NewsService) { }

	@Get('posts/:user_id')
	async getUserPosts(@Param() param): Promise<any> {

		return this.service.getFeaturedNews(param.user_id)
	}

	@Get('timeline/:user_id')
	async getUserTimeline(@Param() param): Promise<any> {

		return this.service.getFeaturedNews(param.user_id)
	}

	@Post('posts/')
	async postContent(@Body() param): Promise<any> {
	
		// return this.
	}
}
