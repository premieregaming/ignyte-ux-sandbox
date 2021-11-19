import { DatabaseService } from './database.service';
export declare class DatabaseController {
    private readonly dataService;
    constructor(dataService: DatabaseService);
    query(sql: string, values: Array<any>): Promise<any>;
}
