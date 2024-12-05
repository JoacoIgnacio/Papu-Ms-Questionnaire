"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const answer_schema_1 = require("./answer.schema");
const questionnaire_schema_1 = require("../questionnaire/questionnaire.schema");
const question_schema_1 = require("../question/question.schema");
const inspector_1 = require("inspector");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
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
            response: response,
            observations,
        });
        const now = new Date();
        now.setSeconds(0, 0);
        now.setHours(now.getHours() - 3);
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
            const key = `${qa.questionnaireId._id.toString()}_${qa.date}`;
            if (!uniqueQuestionnaires.has(key)) {
                uniqueQuestionnaires.set(key, {
                    questionnaire: qa.questionnaireId,
                    date: qa.date
                });
            }
        });
        const sortedQuestionnaires = Array.from(uniqueQuestionnaires.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return sortedQuestionnaires;
    }
    async getUserAnswersForQuestionnaire(userId, questionnaireId, _date) {
        const answers = await this.answerModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .exec();
        const answerIds = answers.map(answer => answer._id);
        const startDate = new Date(_date);
        const endDate = new Date(startDate);
        endDate.setSeconds(endDate.getSeconds() + 30);
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
        try {
            const imagePromises = userAnswers.map(async (answer) => {
                if (answer.images && answer.images.length > 0) {
                    inspector_1.console.log(answer.images);
                    answer.images = await Promise.all(answer.images.map(async (imagePath) => {
                        const absolutePath = path.resolve(imagePath);
                        const imageBuffer = fs.readFileSync(absolutePath);
                        return imageBuffer.toString('base64');
                    }));
                }
            });
            await Promise.all(imagePromises);
        }
        catch (error) {
            inspector_1.console.log(error);
        }
        return userAnswers;
    }
    async createImage(createAnswerDto) {
        const { questionnaireId, questionId, userId, response, observations, images } = createAnswerDto;
        let question = await this.questionModel.findById(questionId).exec();
        if (!question) {
            question = new this.questionModel({ _id: questionId, text: 'Nueva Pregunta', type: 'Tipo de pregunta' });
            await question.save();
        }
        const createdAnswer = new this.answerModel({
            questionnaireAnswerId: null,
            questionId: question._id,
            userId: new mongoose_2.Types.ObjectId(userId),
            response: response,
            images: []
        });
        if (images && images.length > 0) {
            const uploadDir = path.join('upload');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            createdAnswer.images = await Promise.all(images.map(async (base64Image, index) => {
                const matches = base64Image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
                if (!matches || matches.length !== 3) {
                    throw new Error('Invalid base64 image format');
                }
                const imageBuffer = Buffer.from(matches[2], 'base64');
                const imageType = matches[1];
                const imageName = `${createdAnswer._id}_${index}.${imageType}`;
                const imagePath = path.join(uploadDir, imageName);
                const compressedImageBuffer = await (0, sharp_1.default)(imageBuffer)
                    .resize(800)
                    .jpeg({ quality: 80 })
                    .toBuffer();
                fs.writeFileSync(imagePath, compressedImageBuffer);
                return imagePath;
            }));
        }
        await createdAnswer.save();
        const now = new Date();
        now.setSeconds(0, 0);
        now.setHours(now.getHours() - 3);
        const questionnaireAnswer = new this.questionnaireAnswerModel({
            questionnaireId: new mongoose_2.Types.ObjectId(questionnaireId),
            answerId: createdAnswer._id,
            date: now.toISOString(),
        });
        inspector_1.console.log(questionnaireAnswer._id);
        await questionnaireAnswer.save();
        inspector_1.console.log(questionnaireAnswer._id);
        createdAnswer.questionnaireAnswerId = questionnaireAnswer._id;
        await createdAnswer.save();
        return createdAnswer;
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