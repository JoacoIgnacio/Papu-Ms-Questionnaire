"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const questionnaire_controller_1 = require("./questionnaire.controller");
const answer_controller_1 = require("../answer/answer.controller");
const questionnaire_service_1 = require("./questionnaire.service");
const answer_service_1 = require("../answer/answer.service");
const questionnaire_schema_1 = require("./questionnaire.schema");
const answer_schema_1 = require("../answer/answer.schema");
let QuestionnaireModule = class QuestionnaireModule {
};
exports.QuestionnaireModule = QuestionnaireModule;
exports.QuestionnaireModule = QuestionnaireModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: questionnaire_schema_1.Questionnaire.name, schema: questionnaire_schema_1.QuestionnaireSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: answer_schema_1.Answer.name, schema: answer_schema_1.AnswerSchema }])
        ],
        controllers: [questionnaire_controller_1.QuestionnaireController, answer_controller_1.AnswerController],
        providers: [questionnaire_service_1.QuestionnaireService, answer_service_1.AnswerService],
    })
], QuestionnaireModule);
//# sourceMappingURL=questionnaire.module.js.map