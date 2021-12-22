import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('content')
export class ContentController {

	constructor(private readonly service: ContentService) { }

	@Get('posts/:user_id')
	async getUserPosts(@Param() param): Promise<any> {

		return this.service.getUserPosts(param.user_id)
	}

	@Get('timeline/:user_id')
	async getUserTimeline(@Param() param): Promise<any> {

		return this.service.getTimeline(param.user_id)
	}

	@Post('posts')
	async postContent(@Body() data: CreatePostDto): Promise<any> {
	
		return this.service.createPost(data)
	}
}
