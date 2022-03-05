import { IsArray, IsInt, IsString } from 'class-validator';

export class RetrieveAllGamesDto {

	@IsArray()
	readonly platforms

	@IsInt()
	readonly limit

	@IsInt()
	readonly offset

	@IsString()
	readonly search
}