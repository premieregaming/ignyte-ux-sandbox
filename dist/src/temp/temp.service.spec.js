"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const temp_service_1 = require("./temp.service");
describe('TempService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [temp_service_1.TempService],
        }).compile();
        service = module.get(temp_service_1.TempService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=temp.service.spec.js.map