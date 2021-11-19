"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const temp_controller_1 = require("./temp.controller");
describe('TempController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [temp_controller_1.TempController],
        }).compile();
        controller = module.get(temp_controller_1.TempController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=temp.controller.spec.js.map