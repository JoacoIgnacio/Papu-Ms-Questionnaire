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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const answer_schema_1 = require("./answer.schema");
let AnswerService = class AnswerService {
    constructor(answerModel) {
        this.answerModel = answerModel;
    }
    async createResponses(userId, questionnaireId, answers) {
        const answerDocs = answers.map(answer => ({
            userId: new mongoose_2.Types.ObjectId(userId),
            questionnaireId: new mongoose_2.Types.ObjectId(questionnaireId),
            questionId: new mongoose_2.Types.ObjectId(answer.questionId),
            response: answer.response,
            observations: answer.observations || '',
        }));
        return this.answerModel.insertMany(answerDocs);
    }
    async getQuestionnaireHistory(userId) {
        return this.answerModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate({
            path: 'questionnaireId',
            select: 'title description',
        })
            .populate({
            path: 'questionId',
            select: 'text type options',
        })
            .exec();
    }
};
exports.AnswerService = AnswerService;
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(answer_schema_1.Answer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnswerService);
//# sourceMappingURL=answer.service.js.map