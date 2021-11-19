"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const database_controller_1 = require("./database.controller");
describe('DatabaseController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [database_controller_1.DatabaseController],
        }).compile();
        controller = module.get(database_controller_1.DatabaseController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=database.controller.spec.js.map