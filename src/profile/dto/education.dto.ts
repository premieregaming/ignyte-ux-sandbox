import { IsString } from "class-validator";

export class EducationDto {

	@IsString()
	readonly user_id;

	@IsString()
	readonly school_type;

	@IsString()
	readonly school_name;

	@IsString()
	readonly degree;

	@IsString()
	readonly classyear;
}