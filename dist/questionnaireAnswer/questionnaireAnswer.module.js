"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireAnswerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const answer_schema_1 = require("../answer/answer.schema");
const questionnaireAnswer_schema_1 = require("./questionnaireAnswer.schema");
let QuestionnaireAnswerModule = class QuestionnaireAnswerModule {
};
exports.QuestionnaireAnswerModule = QuestionnaireAnswerModule;
exports.QuestionnaireAnswerModule = QuestionnaireAnswerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: answer_schema_1.Answer.name, schema: answer_schema_1.AnswerSchema },
                { name: questionnaireAnswer_schema_1.QuestionnaireAnswer.name, schema: questionnaireAnswer_schema_1.QuestionnaireAnswerSchema }
            ])
        ],
        controllers: [],
        providers: [],
        exports: [mongoose_1.MongooseModule]
    })
], QuestionnaireAnswerModule);
//# sourceMappingURL=questionnaireAnswer.module.js.map