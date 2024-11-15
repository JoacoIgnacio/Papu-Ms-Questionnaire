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
exports.QuestionnaireService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const answer_schema_1 = require("../answer/answer.schema");
const questionnaire_schema_1 = require("./questionnaire.schema");
let QuestionnaireService = class QuestionnaireService {
    constructor(questionnaireModel, answerModel) {
        this.questionnaireModel = questionnaireModel;
        this.answerModel = answerModel;
    }
    async create(createQuestionnaireDto) {
        const createdQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
        return createdQuestionnaire.save();
    }
    async getQuestionnaireWithUserAnswers(questionnaireId, userId) {
        const questionnaire = await this.questionnaireModel
            .findById(questionnaireId)
            .populate('questions')
            .exec();
        if (!questionnaire) {
            throw new Error('Questionnaire not found');
        }
        const userAnswers = await this.answerModel.find({
            questionnaireId: new mongoose_2.Types.ObjectId(questionnaireId),
            userId: new mongoose_2.Types.ObjectId(userId),
        }).exec();
        const questionsWithAnswers = questionnaire.questions.map((question) => {
            const answer = userAnswers.find(ans => ans.questionId.toString() === question._id.toString());
            return {
                questionId: question._id,
                text: question.text,
                type: question.type,
                options: question.options,
                userAnswer: answer ? answer.response : null,
            };
        });
        return {
            questionnaireId: questionnaire._id,
            title: questionnaire.title,
            description: questionnaire.description,
            questions: questionsWithAnswers,
        };
    }
    async getAllQuestionnaires() {
        return this.questionnaireModel.find({}, { _id: 1, title: 1 }).exec();
    }
    async findOne(id) {
        return this.questionnaireModel.findById(id).exec();
    }
    async update(id, updateQuestionnaireDto) {
        return this.questionnaireModel.findByIdAndUpdate(id, updateQuestionnaireDto, { new: true }).exec();
    }
    async delete(id) {
        return this.questionnaireModel.findByIdAndDelete(id).exec();
    }
};
exports.QuestionnaireService = QuestionnaireService;
exports.QuestionnaireService = QuestionnaireService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(questionnaire_schema_1.Questionnaire.name)),
    __param(1, (0, mongoose_1.InjectModel)(answer_schema_1.Answer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], QuestionnaireService);
//# sourceMappingURL=questionnaire.service.js.map