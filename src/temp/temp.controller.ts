import { Controller, Get } from '@nestjs/common';

@Controller('temp')
export class TempController {

	@Get('echo')
	echo(): string {

		return "echo";
	}
}
