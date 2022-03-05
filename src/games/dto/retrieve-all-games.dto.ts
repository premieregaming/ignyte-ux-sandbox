import { IsArray, IsInt } from 'class-validator';

export class RetrieveAllGamesDto {

	@IsArray()
	readonly platforms

	@IsInt()
	readonly limit

	@IsInt()
	readonly offset
}