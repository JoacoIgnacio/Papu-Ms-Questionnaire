"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const answer_controller_1 = require("./answer.controller");
describe('AnswerController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [answer_controller_1.AnswerController],
        }).compile();
        controller = module.get(answer_controller_1.AnswerController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=answer.controller.spec.js.map