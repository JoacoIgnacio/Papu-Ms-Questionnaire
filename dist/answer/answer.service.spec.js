"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const answer_service_1 = require("./answer.service");
describe('AnswerService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [answer_service_1.AnswerService],
        }).compile();
        service = module.get(answer_service_1.AnswerService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=answer.service.spec.js.map