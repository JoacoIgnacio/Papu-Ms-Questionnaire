import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Answer } from 'src/answer/answer.schema';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
    @InjectModel(Answer.name) private answerModel: Model<Answer>
  ) {}

  // Crear un nuevo cuestionario
  async create(createQuestionnaireDto: any): Promise<Questionnaire> {
    const createdQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
    return createdQuestionnaire.save();
  }

  async getQuestionnaireWithUserAnswers(questionnaireId: string, userId: string) {
    // Paso 1: Obtener el cuestionario con las preguntas relacionadas
    const questionnaire = await this.questionnaireModel
      .findById(questionnaireId)
      .populate('questions')
      .exec();

    if (!questionnaire) {
      throw new Error('Questionnaire not found');
    }

    // Paso 2: Obtener las respuestas del usuario para el cuestionario y sus preguntas
    const userAnswers = await this.answerModel.find({
      questionnaireId: new Types.ObjectId(questionnaireId),
      userId: new Types.ObjectId(userId),
    }).exec();

    // Paso 3: Formatear la salida con preguntas y respuestas
    const questionsWithAnswers = questionnaire.questions.map((question: any) => {
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

  // Obtener la lista de cuestionarios (solo ID y título)
  async getAllQuestionnaires(): Promise<any[]> {
    return this.questionnaireModel.find({}, { _id: 1, title: 1 }).exec();
  }

  // Obtener un cuestionario completo por ID
  async findOne(id: string): Promise<Questionnaire | null> {
    return this.questionnaireModel.findById(id).exec();
  }

  // Actualizar un cuestionario
  async update(id: string, updateQuestionnaireDto: any): Promise<Questionnaire | null> {
    return this.questionnaireModel.findByIdAndUpdate(id, updateQuestionnaireDto, { new: true }).exec();
  }

  // Eliminar un cuestionario
  async delete(id: string): Promise<any> {
    return this.questionnaireModel.findByIdAndDelete(id).exec();
  }
}
