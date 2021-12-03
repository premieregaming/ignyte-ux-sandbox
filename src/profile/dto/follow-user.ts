import { IsString } from "class-validator";

export class FollowUserDto {

	@IsString()
	readonly user_id;

	@IsString()
	readonly follow_id;
}