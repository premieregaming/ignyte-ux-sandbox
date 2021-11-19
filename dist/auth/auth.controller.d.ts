import { GoogleAuthDto } from './dto/google-auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleToken(googleAuthDto: GoogleAuthDto): void;
}
