import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';

@Injectable()
export class QuestionnaireService {
  constructor(@InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>) {}

  async create(createQuestionnaireDto: any): Promise<Questionnaire> {
    const createdQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
    return createdQuestionnaire.save();
  }

  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireModel.find().exec();
  }

  async findOne(id: string): Promise<Questionnaire | null> {
    return this.questionnaireModel.findById(id).exec();
  }
  
  async update(id: string, updateQuestionnaireDto: any): Promise<Questionnaire | null> {
    return this.questionnaireModel.findByIdAndUpdate(id, updateQuestionnaireDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.questionnaireModel.findByIdAndDelete(id).exec();
  }
}
