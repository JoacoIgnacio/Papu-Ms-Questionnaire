import { Model } from 'mongoose';
import { Question } from './question.schema';
export declare class QuestionService {
    private questionModel;
    constructor(questionModel: Model<Question>);
    create(createQuestionDto: any): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: string): Promise<Question | null>;
    update(id: string, updateQuestionDto: any): Promise<Question | null>;
    delete(id: string): Promise<Question | null>;
}
