import { IsInt, IsString } from 'class-validator';

export class MessageDto {

	@IsString()
	readonly chat_id

	@IsString()
	readonly content
}