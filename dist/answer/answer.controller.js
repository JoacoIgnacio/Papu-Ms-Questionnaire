"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    async create(createAnswerDto) {
        return this.answerService.create(createAnswerDto);
    }
    async getQuestionnaireHistory(userId) {
        return this.answerService.getQuestionnaireHistory(userId);
    }
    async getQuestionnairesCompletedByUser(userId) {
        return this.answerService.getQuestionnairesCompletedByUser(userId);
    }
    async getUserAnswersForQuestionnaire(userId, questionnaireId, date) {
        return this.answerService.getUserAnswersForQuestionnaire(userId, questionnaireId, date);
    }
};
exports.AnswerController = AnswerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId/history'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getQuestionnaireHistory", null);
__decorate([
    (0, common_1.Get)(':userId/questionnaires'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getQuestionnairesCompletedByUser", null);
__decorate([
    (0, common_1.Get)(':userId/:questionnaireId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('questionnaireId')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getUserAnswersForQuestionnaire", null);
exports.AnswerController = AnswerController = __decorate([
    (0, common_1.Controller)('answers'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
//# sourceMappingURL=answer.controller.js.map