import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Answer } from './answer.schema';
import { QuestionnaireAnswer } from 'src/questionnaireAnswer/questionnaireAnswer.schema';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';
import { Question } from 'src/question/question.schema';
const fs = require('fs');
const path = require('path');

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel('QuestionnaireAnswer') private questionnaireAnswerModel: Model<QuestionnaireAnswer>,
    
  ) {}

  async create(createAnswerDto: any): Promise<Answer | QuestionnaireAnswer> {
    const { questionnaireId, userId, responses, location, images } = createAnswerDto;

    // Crear una nueva respuesta para el cuestionario
    const createdAnswers = [];

    // Crear las respuestas
    for (let response of responses) {
      const question = await this.questionModel.findById(response.questionId).exec();

      if (!question) {
        throw new NotFoundException('Pregunta no encontrada');
      }

      const createdAnswer = new this.answerModel({
        questionnaireAnswerId: null,
        questionId: question._id,
        userId: new Types.ObjectId(userId),
        response: response.response,
        observations: response.observations || null,
        images, // Enviar las imágenes asociadas
      });

      await createdAnswer.save();
      createdAnswers.push(createdAnswer);
    }

    // Relacionar las respuestas con el cuestionario
    const now = new Date();
    now.setSeconds(0, 0);

    const questionnaireAnswer = new this.questionnaireAnswerModel({
      questionnaireId: new Types.ObjectId(questionnaireId),
      answerId: createdAnswers.map(answer => answer._id),
      date: now.toISOString(),
      location, // Guardar la ubicación aquí
    });

    await questionnaireAnswer.save();

    // Asignar el questionnaireAnswerId a las respuestas creadas
    for (let answer of createdAnswers) {
      answer.questionnaireAnswerId = questionnaireAnswer._id;
      await answer.save();
    }

    return questionnaireAnswer;
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

    // Extraer y devolver solo los cuestionarios, eliminando duplicados con la misma fecha
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

    // Convertir a array y ordenar por fecha
    const sortedQuestionnaires = Array.from(uniqueQuestionnaires.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return sortedQuestionnaires;
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

  async createImage(createAnswerDto: any): Promise<Answer> {
    const { questionnaireId, questionId, userId, response, observations, images } = createAnswerDto;

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
      userId: new Types.ObjectId(userId),
      response: response,
      images: []
    // Convertir la imagen de base64 a un archivo y guardarla en la carpeta upload
    });

    if (images && images.length > 0) {
      const uploadDir = path.join(__dirname, '..', '..', 'upload');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      createdAnswer.images = images.map((base64Image: string, index: number) => {
        const matches = base64Image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          throw new Error('Invalid base64 image format');
        }

        const imageBuffer = Buffer.from(matches[2], 'base64');
        const imageType = matches[1];
        const imageName = `${createdAnswer._id}_${index}.${imageType}`;
        const imagePath = path.join(uploadDir, imageName);
        
        fs.writeFileSync(imagePath, imageBuffer);

        return imagePath;
      });
    }
    

   

    await createdAnswer.save();

    // Relacionar la respuesta con el cuestionario
    const now = new Date();
    now.setSeconds(0, 0); // Eliminar segundos y milisegundos

    now.setHours(now.getHours() - 3); // Restar 5 horas a la hora actual

    const questionnaireAnswer = new this.questionnaireAnswerModel({
      questionnaireId: new Types.ObjectId(questionnaireId),
      answerId: createdAnswer._id,
      date: now.toISOString(),
    });

    console.log(questionnaireAnswer._id);

    await questionnaireAnswer.save();
    console.log(questionnaireAnswer._id);
    // Asignar el questionnaireAnswerId al createdAnswer
    createdAnswer.questionnaireAnswerId = questionnaireAnswer._id;

    await createdAnswer.save();

    return createdAnswer;
  }
}
