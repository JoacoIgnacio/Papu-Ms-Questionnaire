import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.schema';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private questionModel: Model<Question>) {}

  async create(createQuestionDto: any): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findOne(id: string): Promise<Question | null> {
    return this.questionModel.findById(id).exec();
  }

  async update(id: string, updateQuestionDto: any): Promise<Question | null> {
    return this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Question | null> {
    return this.questionModel.findByIdAndDelete(id).exec();
  }
}