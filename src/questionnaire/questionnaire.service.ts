import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';

@Injectable()
export class QuestionnaireService {
  constructor(@InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>) {}

  // Crear un nuevo cuestionario
  async create(createQuestionnaireDto: any): Promise<Questionnaire> {
    const createdQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
    return createdQuestionnaire.save();
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
