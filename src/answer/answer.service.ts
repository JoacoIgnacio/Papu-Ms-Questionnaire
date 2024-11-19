import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Answer } from './answer.schema';
<<<<<<< Updated upstream

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) {}
=======
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';
import { Question } from 'src/question/question.schema';
import { questionnaireAnswer } from 'src/questionnaireAnswer/questionnaireAnswer.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel('QuestionnaireAnswer') private questionnaireAnswerModel: Model<questionnaireAnswer>,
  ) {}
>>>>>>> Stashed changes

  // Crear una respuesta
  async create(answer: Answer) {
    const answerWithObjectIds = {
      userId: new Types.ObjectId(answer.userId),
      questionnaireId: new Types.ObjectId(answer.questionnaireId),
      questionId: new Types.ObjectId(answer.questionId),
      response: answer.response,
      observations: answer.observations || '',
    };

    return this.answerModel.create(answerWithObjectIds);
  }

  // Crear respuestas para un cuestionario
  async createResponses(userId: string, questionnaireId: string, answers: { questionId: string, response: string, observations?: string }[]) {
    const answerDocs = answers.map(answer => ({
      userId: new Types.ObjectId(userId),
      questionnaireId: new Types.ObjectId(questionnaireId),
      questionId: new Types.ObjectId(answer.questionId),
      response: answer.response,
      observations: answer.observations || '',
    }));

    return this.answerModel.insertMany(answerDocs);
  }

  // Obtener historial de cuestionarios completados por un usuario
  async getQuestionnaireHistory(userId: string) {
    return this.answerModel
      .find({ userId: new Types.ObjectId(userId) })
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
}
