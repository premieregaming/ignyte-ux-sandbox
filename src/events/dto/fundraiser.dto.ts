import { IsString } from "class-validator";

export class CreateFundraiserDto {
	
	@IsString()
	readonly user_id
	
	@IsString()
	readonly goal_amount
	
	@IsString()
	readonly is_finished
	
	@IsString()
	readonly start_time
	
	@IsString()
	readonly end_time
	
	@IsString()
	readonly create_timestamp
}