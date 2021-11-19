import { OAuth2Client } from 'google-auth-library';
export declare class AuthService {
    static google_client_id: string;
    static client: OAuth2Client;
    googleTokenAuth(token: string): Promise<string>;
}
