import { IsInt, IsString } from 'class-validator';

export class GoogleTokenVerifyDto {

	@IsString()
	readonly idtoken: string;
}

export class GoogleAuthDto {

	@IsString()
	readonly id;

	@IsString()
	readonly first_name;

	@IsString()
	readonly last_name;

	@IsString()
	readonly profile_photo;

	@IsString()
	readonly email;
}