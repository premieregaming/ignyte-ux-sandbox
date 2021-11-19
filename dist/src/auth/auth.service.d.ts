import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { DatabaseService } from '../database/database.service';
import { AccountService } from '../account/account.service';
export declare class AuthService {
    private readonly database;
    private readonly account;
    constructor(database: DatabaseService, account: AccountService);
    static google_client_id: string;
    static client: OAuth2Client;
    googleTokenVerify(token: string): Promise<string>;
    googleAuth(data: GoogleAuthDto): Promise<unknown>;
}
