import { Controller, Post, Body } from '@nestjs/common';
import { GoogleAuthDto, GoogleTokenVerifyDto } from './dto/google-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@Post('google-token')
	googleToken(@Body() googleAuthDto: GoogleTokenVerifyDto) {
		return this.authService.googleTokenVerify(googleAuthDto.idtoken)
	}

	@Post('google-auth')
	googleAuth(@Body() googleAuth: GoogleAuthDto) {
		return this.authService.googleAuth(googleAuth)
	}
}
