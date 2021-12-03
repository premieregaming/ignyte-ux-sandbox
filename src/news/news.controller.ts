import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {

	constructor(private readonly service: NewsService) { }

	@Get('featured/:user_id')
	async getFeaturedNews(@Param() param): Promise<any> { 

		return this.service.getFeaturedNews(param.user_id)
	}

	@Get('ignyted/:user_id')
	async getIgnytedNews(@Param() param): Promise<any>  {
		
		return this.service.getIgnytedNews(param.user_id)
	}

	@Get('trending/:user_id')
	async getTrendingNews(@Param() param): Promise<any>  {

		return this.service.getTrendingNews(param.user_id)
	}

	@Get('all/:user_id')
	async getAllNews(@Param() param): Promise<any>  {

		return this.service.getAllNews(param.user_id)
	}
}
