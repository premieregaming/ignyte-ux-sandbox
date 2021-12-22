import { IsInt, IsString } from 'class-validator';

export class CreatePostDto {

	@IsString()
	readonly user_id

	@IsString()
	readonly post_content
}