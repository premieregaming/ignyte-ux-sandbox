"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const account_service_1 = require("./account.service");
describe('AccountService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [account_service_1.AccountService],
        }).compile();
        service = module.get(account_service_1.AccountService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=account.service.spec.js.map