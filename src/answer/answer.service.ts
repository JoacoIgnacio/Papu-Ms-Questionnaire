import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Answer } from './answer.schema';
import { QuestionnaireAnswer } from 'src/questionnaireAnswer/questionnaireAnswer.schema';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';
import { Question } from 'src/question/question.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel('QuestionnaireAnswer') private questionnaireAnswerModel: Model<QuestionnaireAnswer>,
  ) {}

  async create(createAnswerDto: any): Promise<Answer> {
    const { questionnaireId, questionId,userId, response, observations } = createAnswerDto;

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
      userId: new Types.ObjectId(createAnswerDto.userId),
      response,
      observations,
    });

    // Relacionar la respuesta con el cuestionario
    const now = new Date();
    now.setSeconds(0, 0); // Eliminar segundos y milisegundos

    const questionnaireAnswer = new this.questionnaireAnswerModel({
      questionnaireId: new Types.ObjectId(questionnaireId),
      answerId: createdAnswer._id,
      date: now.toISOString(),
    });

    await questionnaireAnswer.save();

    // Asignar el questionnaireAnswerId al createdAnswer
    createdAnswer.questionnaireAnswerId = questionnaireAnswer._id;
    await createdAnswer.save();

    return createdAnswer;
  }

  // Obtener historial de cuestionarios completados por un usuario
  async getQuestionnaireHistory(userId: string) {
    // Primero, encontrar todas las respuestas del usuario
    const answers = await this.answerModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate({
        path: 'questionId',
        select: 'text type options'
      })
      .exec();

    // Luego, encontrar los questionnaireAnswer relacionados con estas respuestas
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

    // Combinar los datos de las respuestas con los datos de los cuestionarios
    return questionnaireAnswers.map(qa => ({
      questionnaire: qa.questionnaireId,
      answers: answers.filter(answer => answer._id.equals(qa.answerId))
    }));
  }

   // Obtener historial de cuestionarios completados por un usuario
  async getQuestionnairesCompletedByUser(userId: string) {
    // Primero, encontrar todas las respuestas del usuario
    const answers = await this.answerModel
      .find({ userId: new Types.ObjectId(userId) })
      .exec();

    // Luego, encontrar los questionnaireAnswer relacionados con estas respuestas
    const questionnaireAnswers = await this.questionnaireAnswerModel
      .find({ answerId: { $in: answers.map(answer => answer._id) } })
      .populate({
        path: 'questionnaireId',
        select: 'title description'
      })
      .exec();

    // Extraer y devolver solo los cuestionarios, eliminando duplicados
    const uniqueQuestionnaires = new Map();
    questionnaireAnswers.forEach(qa => {
      uniqueQuestionnaires.set(qa.questionnaireId._id.toString(), {
        questionnaire: qa.questionnaireId,
        date: qa.date
      });
    });

    return Array.from(uniqueQuestionnaires.values());
  }
  // Obtener respuestas de un usuario a un cuestionario específico en una fecha específica
  async getUserAnswersForQuestionnaire(userId: string, questionnaireId: string, _date: string) {
    // Primero, encontrar todas las respuestas del usuario
    const answers = await this.answerModel
      .find({ userId: new Types.ObjectId(userId) })
      .exec();

    // Obtener los IDs de las respuestas del usuario
    const answerIds = answers.map(answer => answer._id);


    // Luego, encontrar los questionnaireAnswer relacionados con estas respuestas y el cuestionario específico en la fecha específica
    const startDate = new Date(_date);
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 2);

    const questionnaireAnswers = await this.questionnaireAnswerModel
      .find({
      answerId: { $in: answerIds },
      questionnaireId: new Types.ObjectId(questionnaireId),
      date: { $gte: startDate.toISOString(), $lt: endDate.toISOString() }
      })
      .exec();

    if (questionnaireAnswers.length === 0) {
      throw new Error('No se encontró el cuestionario para el usuario en la fecha especificada');
    }

    // Encontrar todas las respuestas relacionadas con los questionnaireAnswers
    const userAnswers = await this.answerModel
      .find({ questionnaireAnswerId: { $in: questionnaireAnswers.map(qa => qa._id) } })
      .populate({
        path: 'questionId',
        select: 'text type options'
      })
      .exec();

    return userAnswers;
  }
}
