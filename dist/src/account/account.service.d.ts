import { GoogleAuthDto } from '../auth/dto/google-auth.dto';
import { DatabaseService } from '../database/database.service';
export declare class AccountService {
    private readonly db;
    constructor(db: DatabaseService);
    create_google_acct(g_user: GoogleAuthDto): Promise<unknown>;
    get_account_data(id: string): Promise<unknown>;
}
