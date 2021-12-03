import { IsString } from "class-validator";

export class FriendRequestDto {

	@IsString()
	readonly user_id;

	@IsString()
	readonly friend_id;
}