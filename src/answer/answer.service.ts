import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Answer } from './answer.schema';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';
import { Question } from 'src/question/question.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async create(createAnswerDto: any): Promise<Answer> {
    const { questionnaireId, questionId, response, observations } = createAnswerDto;

    // Verificar si el cuestionario existe, si no, crearlo
    let questionnaire = await this.questionnaireModel.findById(questionnaireId).exec();
    if (!questionnaire) {
      questionnaire = new this.questionnaireModel({ _id: questionnaireId, title: 'Nuevo Cuestionario', description: 'Descripción del cuestionario' });
      await questionnaire.save();
    }

    // Verificar si la pregunta existe, si no, crearla
    let question = await this.questionModel.findById(questionId).exec();
    if (!question) {
      question = new this.questionModel({ _id: questionId, text: 'Nueva Pregunta', type: 'Tipo de pregunta' });
      await question.save();
    }

    // Crear la respuesta
    const createdAnswer = new this.answerModel({
      questionnaireId: questionnaire._id,
      questionId: question._id,
      response,
      observations,
    });

    return createdAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }

  async findOne(id: string): Promise<Answer | null> {
    return this.answerModel.findById(id).exec();
  }

  async delete(id: string): Promise<any> {
    return this.answerModel.findByIdAndDelete(id).exec();
  }
}