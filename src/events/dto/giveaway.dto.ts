import { IsString } from "class-validator";

export class CreateGiveawayDto {

	@IsString()
	readonly user_id

	@IsString()
	readonly currency_amount

	@IsString()
	readonly is_finished

	@IsString()
	readonly start_time

	@IsString()
	readonly end_time

	@IsString()
	readonly create_timestamp
}