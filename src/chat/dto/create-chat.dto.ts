import { IsInt, IsString } from 'class-validator';

export class CreateChatDto {

	@IsString()
	readonly user_id

	@IsString()
	readonly friend_id
}