"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("./database.service");
describe('DatabaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [database_service_1.DatabaseService],
        }).compile();
        service = module.get(database_service_1.DatabaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=database.service.spec.js.map