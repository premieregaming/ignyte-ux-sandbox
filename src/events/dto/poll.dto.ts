import { IsString } from "class-validator";

export class CreatePollDto {

	@IsString()
	readonly user_id

	@IsString()
	readonly content

	@IsString()
	readonly option1

	@IsString()
	readonly option2

	@IsString()
	readonly option3

	@IsString()
	readonly option4

	@IsString()
	readonly option5
}