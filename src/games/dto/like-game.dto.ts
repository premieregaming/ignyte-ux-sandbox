import { IsArray, IsBoolean, IsInt, IsString } from 'class-validator';

export class LikeGameDto {

	@IsString()
	readonly user_id

	@IsInt()
	readonly game_id

	@IsBoolean()
	readonly liked
}