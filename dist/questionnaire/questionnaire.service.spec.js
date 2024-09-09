"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const questionnaire_service_1 = require("./questionnaire.service");
describe('QuestionnaireService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [questionnaire_service_1.QuestionnaireService],
        }).compile();
        service = module.get(questionnaire_service_1.QuestionnaireService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=questionnaire.service.spec.js.map