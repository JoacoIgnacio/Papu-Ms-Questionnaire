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
const questionnaire_schema_1 = require("../questionnaire/questionnaire.schema");
const question_schema_1 = require("../question/question.schema");
let AnswerService = class AnswerService {
    constructor(answerModel, questionnaireModel, questionModel, questionnaireAnswerModel) {
        this.answerModel = answerModel;
        this.questionnaireModel = questionnaireModel;
        this.questionModel = questionModel;
        this.questionnaireAnswerModel = questionnaireAnswerModel;
    }
    async create(createAnswerDto) {
        const { questionnaireId, questionId, userId, response, observations } = createAnswerDto;
        let question = await this.questionModel.findById(questionId).exec();
        if (!question) {
            question = new this.questionModel({ _id: questionId, text: 'Nueva Pregunta', type: 'Tipo de pregunta' });
            await question.save();
        }
        const createdAnswer = new this.answerModel({
            questionnaireAnswerId: null,
            questionId: question._id,
            userId: new mongoose_2.Types.ObjectId(createAnswerDto.userId),
            response,
            observations,
        });
        const now = new Date();
        now.setSeconds(0, 0);
        const questionnaireAnswer = new this.questionnaireAnswerModel({
            questionnaireId: new mongoose_2.Types.ObjectId(questionnaireId),
            answerId: createdAnswer._id,
            date: now.toISOString(),
        });
        await questionnaireAnswer.save();
        createdAnswer.questionnaireAnswerId = questionnaireAnswer._id;
        await createdAnswer.save();
        return createdAnswer;
    }
    async getQuestionnaireHistory(userId) {
        const answers = await this.answerModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate({
            path: 'questionId',
            select: 'text type options'
        })
            .exec();
        const questionnaireAnswers = await this.questionnaireAnswerModel
            .find({ answerId: { $in: answers.map(answer => answer._id) } })
            .populate({
            path: 'questionnaireId',
            select: 'title description',
            populate: {
                path: 'questions',
                select: 'text type options'
            }
        })
            .exec();
        return questionnaireAnswers.map(qa => ({
            questionnaire: qa.questionnaireId,
            answers: answers.filter(answer => answer._id.equals(qa.answerId))
        }));
    }
    async getQuestionnairesCompletedByUser(userId) {
        const answers = await this.answerModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .exec();
        const questionnaireAnswers = await this.questionnaireAnswerModel
            .find({ answerId: { $in: answers.map(answer => answer._id) } })
            .populate({
            path: 'questionnaireId',
            select: 'title description'
        })
            .exec();
        const uniqueQuestionnaires = new Map();
        questionnaireAnswers.forEach(qa => {
            uniqueQuestionnaires.set(qa.questionnaireId._id.toString(), {
                questionnaire: qa.questionnaireId,
                date: qa.date
            });
        });
        return Array.from(uniqueQuestionnaires.values());
    }
    async getUserAnswersForQuestionnaire(userId, questionnaireId, _date) {
        const answers = await this.answerModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .exec();
        const answerIds = answers.map(answer => answer._id);
        const startDate = new Date(_date);
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + 2);
        const questionnaireAnswers = await this.questionnaireAnswerModel
            .find({
            answerId: { $in: answerIds },
            questionnaireId: new mongoose_2.Types.ObjectId(questionnaireId),
            date: { $gte: startDate.toISOString(), $lt: endDate.toISOString() }
        })
            .exec();
        if (questionnaireAnswers.length === 0) {
            throw new Error('No se encontró el cuestionario para el usuario en la fecha especificada');
        }
        const userAnswers = await this.answerModel
            .find({ questionnaireAnswerId: { $in: questionnaireAnswers.map(qa => qa._id) } })
            .populate({
            path: 'questionId',
            select: 'text type options'
        })
            .exec();
        return userAnswers;
    }
};
exports.AnswerService = AnswerService;
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(answer_schema_1.Answer.name)),
    __param(1, (0, mongoose_1.InjectModel)(questionnaire_schema_1.Questionnaire.name)),
    __param(2, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __param(3, (0, mongoose_1.InjectModel)('QuestionnaireAnswer')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AnswerService);
//# sourceMappingURL=answer.service.js.map