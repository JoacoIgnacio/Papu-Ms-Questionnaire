"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const questionnaire_controller_1 = require("./questionnaire.controller");
describe('QuestionnaireController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [questionnaire_controller_1.QuestionnaireController],
        }).compile();
        controller = module.get(questionnaire_controller_1.QuestionnaireController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=questionnaire.controller.spec.js.map