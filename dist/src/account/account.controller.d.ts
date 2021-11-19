import { AccountService } from './account.service';
export declare class AccountController {
    private readonly service;
    constructor(service: AccountService);
    getAccountData(params: any): any;
}
