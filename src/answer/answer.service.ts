import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Answer } from './answer.schema';
import { questionnaireAnswer } from 'src/questionnaireAnswer/questionnaireAnswer.schema';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';
import { Question } from 'src/question/question.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel('QuestionnaireAnswer') private questionnaireAnswerModel: Model<questionnaireAnswer>,
  ) {}

  async create(createAnswerDto: any): Promise<Answer> {
    const { questionnaireId, questionId, response, observations } = createAnswerDto;

    // Verificar si la pregunta existe, si no, crearla
    let question = await this.questionModel.findById(questionId).exec();
    if (!question) {
      question = new this.questionModel({ _id: questionId, text: 'Nueva Pregunta', type: 'Tipo de pregunta' });
      await question.save();
    }

    // Crear la respuesta
    const createdAnswer = new this.answerModel({
      questionnaireAnswerId: null, // Inicialmente null, se actualizará después
      questionId: question._id,
      response,
      observations,
    });

    // Relacionar la respuesta con el cuestionario
    const questionnaireAnswer = new this.questionnaireAnswerModel({
      questionnaireId: questionnaireId,
      answerId: createdAnswer._id,
    });

    await questionnaireAnswer.save();

    // Asignar el questionnaireAnswerId al createdAnswer
    createdAnswer.questionnaireAnswerId = questionnaireAnswer._id;
    await createdAnswer.save();

    return createdAnswer;
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
