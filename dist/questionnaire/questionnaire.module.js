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
const questionnaire_service_1 = require("./questionnaire.service");
const questionnaire_schema_1 = require("./questionnaire.schema");
const check_token_guard_1 = require("../guards/check-token.guard");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const answer_schema_1 = require("../answer/answer.schema");
let QuestionnaireModule = class QuestionnaireModule {
};
exports.QuestionnaireModule = QuestionnaireModule;
exports.QuestionnaireModule = QuestionnaireModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: questionnaire_schema_1.Questionnaire.name, schema: questionnaire_schema_1.QuestionnaireSchema },
                { name: answer_schema_1.Answer.name, schema: answer_schema_1.AnswerSchema },
            ]),
        ],
        controllers: [questionnaire_controller_1.QuestionnaireController],
        providers: [questionnaire_service_1.QuestionnaireService, check_token_guard_1.CheckTokenGuard],
    })
], QuestionnaireModule);
//# sourceMappingURL=questionnaire.module.js.map