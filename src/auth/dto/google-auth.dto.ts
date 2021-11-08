import { IsInt, IsString } from 'class-validator';

export class GoogleAuthDto {

	@IsString()
	readonly idtoken: string;
}
