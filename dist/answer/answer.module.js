"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const answer_schema_1 = require("./answer.schema");
const questionnaire_schema_1 = require("../questionnaire/questionnaire.schema");
const question_schema_1 = require("../question/question.schema");
const answer_service_1 = require("./answer.service");
const answer_controller_1 = require("./answer.controller");
const questionnaireAnswer_schema_1 = require("../questionnaireAnswer/questionnaireAnswer.schema");
let AnswerModule = class AnswerModule {
};
exports.AnswerModule = AnswerModule;
exports.AnswerModule = AnswerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: answer_schema_1.Answer.name, schema: answer_schema_1.AnswerSchema },
                { name: questionnaire_schema_1.Questionnaire.name, schema: questionnaire_schema_1.QuestionnaireSchema },
                { name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema },
                { name: 'QuestionnaireAnswer', schema: questionnaireAnswer_schema_1.QuestionnaireAnswerSchema },
            ]),
        ],
        exports: [mongoose_1.MongooseModule],
        providers: [answer_service_1.AnswerService],
        controllers: [answer_controller_1.AnswerController],
    })
], AnswerModule);
//# sourceMappingURL=answer.module.js.map