import { Client } from 'pg';
export declare class DatabaseService {
    client: Client;
    constructor();
    query(sql: string, values: Array<any>): Promise<any>;
}
