import { Controller, Post, Body } from '@nestjs/common';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@Post('google-token')
	googleToken(@Body() googleAuthDto: GoogleAuthDto) {
		this.authService.googleTokenAuth(googleAuthDto.idtoken)
	}
}
